import * as webllm from "@mlc-ai/web-llm";
import type { LLMEngine, ProgressCallback, TokenCallback } from "./engine-interface";

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

  async generate(prompt: string, maxTokens: number = 2000, onToken?: TokenCallback): Promise<string> {
    if (!this.engine) throw new Error('Engine not initialized');

    console.log('[webllm-engine] generate() called');
    console.log('[webllm-engine] Model:', this.modelId);
    console.log(`[webllm-engine] Config: max_tokens=${maxTokens}, temperature=0.4, streaming=${!!onToken}`);

    // Use streaming if callback provided
    if (onToken) {
      const chunks = await this.engine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        max_tokens: maxTokens,
        temperature: 0.4,
        stream: true,
      });

      let fullOutput = '';
      for await (const chunk of chunks) {
        const token = chunk.choices[0]?.delta?.content || '';
        if (token) {
          fullOutput += token;
          onToken(token);
        }
      }

      console.log('[webllm-engine] Streamed response length:', fullOutput.length, 'chars');
      return fullOutput;
    }

    // Non-streaming fallback
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

  async dispose(): Promise<void> {
    if (this.engine) {
      // WebLLM doesn't have explicit dispose, but we can clear the reference
      this.engine = null;
      this.initPromise = null;
    }
  }
}

