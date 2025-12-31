import * as webllm from "@mlc-ai/web-llm";

export type ProgressCallback = (progress: {
  stage: 'downloading' | 'loading' | 'ready';
  progress: number;
  text: string;
}) => void;

class WebLLMEngine {
  private engine: webllm.MLCEngine | null = null;
  private initPromise: Promise<void> | null = null;
  // Using SmolLM for faster download (~500MB) - good enough for config generation
  private modelId = "SmolLM2-360M-Instruct-q4f16_1-MLC";

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

  async generate(prompt: string, maxTokens: number = 2000): Promise<string> {
    if (!this.engine) throw new Error('Engine not initialized');

    console.log('[webllm-engine] generate() called');
    console.log('[webllm-engine] Model:', this.modelId);
    console.log(`[webllm-engine] Config: max_tokens=${maxTokens}, temperature=0.4`);

    const response = await this.engine.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.4,
    });

    const output = response.choices[0].message.content || '';
    console.log('[webllm-engine] Response length:', output.length, 'chars');

    return output;
  }

  isReady(): boolean {
    return this.engine !== null;
  }

  getModelId(): string {
    return this.modelId;
  }
}

export const webllmEngine = new WebLLMEngine();

