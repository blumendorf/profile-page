import { pipeline, TextStreamer } from "@huggingface/transformers";
import type { LLMEngine, ProgressCallback, TokenCallback } from "./engine-interface";

// Type for the text generation pipeline (simplified to avoid complex union types)
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
      // @ts-expect-error - Complex union type from pipeline
      this.generator = await pipeline("text-generation", this.modelId, {
        dtype: "q4",
        device: "webgpu",
        progress_callback: (progressData: { status: string; progress?: number; file?: string }) => {
          // transformers.js progress callback format
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

  async generate(prompt: string, maxTokens: number = 2000, onToken?: TokenCallback): Promise<string> {
    if (!this.generator) throw new Error('Engine not initialized');

    console.log('[transformers-engine] generate() called');
    console.log('[transformers-engine] Model:', this.modelId);
    console.log(`[transformers-engine] Config: max_new_tokens=${maxTokens}, temperature=0.4, streaming=${!!onToken}`);

    const messages = [{ role: "user" as const, content: prompt }];

    // Create a custom streamer if callback provided
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
      temperature: 0.4,
      do_sample: true,
      ...(streamer ? { streamer } : {}),
    });

    // Extract the assistant's response from the result
    // Result can be in various formats depending on the model
    const firstResult = Array.isArray(result) ? result[0] : result;
    const generatedText = (firstResult as { generated_text?: unknown })?.generated_text;

    if (Array.isArray(generatedText)) {
      // Chat format: find the assistant's last message
      const assistantMessage = generatedText.find(
        (msg: { role: string; content: string }) => msg.role === 'assistant'
      );
      const text = assistantMessage?.content || '';
      console.log('[transformers-engine] Response length:', text.length, 'chars');
      return text;
    }

    // Fallback for non-chat format
    const text = typeof generatedText === 'string' ? generatedText : '';
    console.log('[transformers-engine] Response length:', text.length, 'chars');
    return text;
  }

  isReady(): boolean {
    return this.generator !== null;
  }

  getModelId(): string {
    return this.modelId;
  }

  async dispose(): Promise<void> {
    if (this.generator) {
      // Clear the reference - transformers.js will handle cleanup
      this.generator = null;
      this.initPromise = null;
    }
  }
}
