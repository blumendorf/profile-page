import { pipeline, TextStreamer } from "@huggingface/transformers";
import type { LLMEngine, ProgressCallback, TokenCallback, GenerationConfig } from "./types";
import { DEFAULT_GENERATION_CONFIG } from "./types";

type TextGenPipeline = Awaited<ReturnType<typeof pipeline<"text-generation">>>;

/**
 * Transformers.js engine implementation using @huggingface/transformers
 */
export class TransformersEngine implements LLMEngine {
  private generator: TextGenPipeline | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(private modelId: string) {}

  async initialize(onProgress?: ProgressCallback): Promise<void> {
    if (this.generator) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._doInit(onProgress);
    return this.initPromise;
  }

  private async _doInit(onProgress?: ProgressCallback): Promise<void> {
    onProgress?.({ stage: 'downloading', progress: 0, text: 'Starting download...' });

    try {
      this.generator = await pipeline("text-generation", this.modelId, {
        dtype: "q4",
        device: "webgpu",
        progress_callback: (progressData: { status: string; progress?: number; file?: string }) => {
          if (progressData.status === 'progress' && progressData.progress !== undefined) {
            const progress = Math.round(progressData.progress);
            onProgress?.({
              stage: 'downloading',
              progress,
              text: progressData.file ? `Downloading ${progressData.file}` : 'Downloading...',
            });
          } else if (progressData.status === 'done') {
            onProgress?.({ stage: 'loading', progress: 100, text: 'Loading into GPU...' });
          } else if (progressData.status === 'ready') {
            onProgress?.({ stage: 'ready', progress: 100, text: 'Model ready' });
          }
        },
      });

      onProgress?.({ stage: 'ready', progress: 100, text: 'Model ready' });
    } catch (error) {
      console.error('[transformers-engine] Init failed:', error);
      throw error;
    }
  }

  async generate(prompt: string, config?: GenerationConfig, onToken?: TokenCallback): Promise<string> {
    if (!this.generator) throw new Error('Engine not initialized');

    const {
      maxTokens,
      temperature,
      topP,
      repetitionPenalty,
    } = { ...DEFAULT_GENERATION_CONFIG, ...config };

    console.log('[transformers-engine] generate() called');
    console.log('[transformers-engine] Model:', this.modelId);

    const messages = [{ role: "user" as const, content: prompt }];

    let streamer: TextStreamer | undefined;
    if (onToken) {
      // @ts-expect-error - TextStreamer constructor varies by version
      streamer = new TextStreamer(this.generator.tokenizer, {
        skip_prompt: true,
        callback_function: (text: string) => {
          onToken(text);
        },
      });
    }

    const result = await this.generator(messages, {
      max_new_tokens: maxTokens,
      temperature,
      top_p: topP,
      repetition_penalty: repetitionPenalty,
      do_sample: true,
      ...(streamer ? { streamer } : {}),
    });

    const firstResult = Array.isArray(result) ? result[0] : result;
    const generatedText = (firstResult as { generated_text?: unknown })?.generated_text;

    if (Array.isArray(generatedText)) {
      type ChatMessage = { role: string; content: string };
      const assistantMessage = generatedText.find(
        (msg: ChatMessage) => msg.role === 'assistant'
      ) as ChatMessage | undefined;
      return assistantMessage?.content ?? '';
    }

    return typeof generatedText === 'string' ? generatedText : '';
  }

  isReady(): boolean {
    return this.generator !== null;
  }

  getModelId(): string {
    return this.modelId;
  }

  dispose(): void {
    if (this.generator) {
      this.generator = null;
      this.initPromise = null;
    }
  }
}

