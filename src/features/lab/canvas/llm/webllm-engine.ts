import * as webllm from "@mlc-ai/web-llm";
import type { LLMEngine, ProgressCallback, TokenCallback, GenerationConfig } from "./types";
import { DEFAULT_GENERATION_CONFIG } from "./types";

/**
 * WebLLM engine implementation using MLC-AI/web-llm
 */
export class WebLLMEngine implements LLMEngine {
  private engine: webllm.MLCEngine | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(private modelId: string) {}

  async initialize(onProgress?: ProgressCallback): Promise<void> {
    if (this.engine) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._doInit(onProgress);
    return this.initPromise;
  }

  private async _doInit(onProgress?: ProgressCallback): Promise<void> {
    onProgress?.({ stage: 'downloading', progress: 0, text: 'Starting download...' });

    this.engine = await webllm.CreateMLCEngine(this.modelId, {
      initProgressCallback: (report) => {
        const progress = Math.round(report.progress * 100);
        const stage = progress < 100 ? 'downloading' : 'loading';
        onProgress?.({ stage, progress, text: report.text });
      },
    });

    onProgress?.({ stage: 'ready', progress: 100, text: 'Model ready' });
  }

  async generate(prompt: string, config?: GenerationConfig, onToken?: TokenCallback): Promise<string> {
    if (!this.engine) throw new Error('Engine not initialized');

    await this.engine.resetChat();

    const {
      maxTokens,
      temperature,
      topP,
      stop,
    } = { ...DEFAULT_GENERATION_CONFIG, ...config };

    console.log('[webllm-engine] generate() called');
    console.log('[webllm-engine] Model:', this.modelId);

    if (onToken) {
      const chunks = await this.engine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature,
        top_p: topP,
        stop,
        stream: true,
      });

      let fullOutput = '';
      for await (const chunk of chunks) {
        const token = chunk.choices[0]?.delta?.content || '';
        if (token) {
          fullOutput += token;
          onToken(token);

          if (stop?.some(s => fullOutput.includes(s))) {
            break;
          }
        }
      }

      return fullOutput;
    }

    const response = await this.engine.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      stop,
    });

    return response.choices[0].message.content || '';
  }

  isReady(): boolean {
    return this.engine !== null;
  }

  getModelId(): string {
    return this.modelId;
  }

  dispose(): void {
    if (this.engine) {
      this.engine.unload().catch(console.error);
      this.engine = null;
      this.initPromise = null;
    }
  }
}

