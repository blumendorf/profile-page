/**
 * Progress callback for model download and initialization
 */
export type ProgressCallback = (progress: {
  stage: 'downloading' | 'loading' | 'ready';
  progress: number;
  text: string;
}) => void;

/**
 * Callback for streaming token generation
 */
export type TokenCallback = (token: string) => void;

/**
 * Common interface for all LLM engine implementations.
 * Supports both WebLLM and transformers.js backends.
 */
export interface LLMEngine {
  /**
   * Initialize the model. Downloads if necessary.
   * @param onProgress - Optional callback for download/load progress
   */
  initialize(onProgress?: ProgressCallback): Promise<void>;

  /**
   * Generate text from a prompt.
   * @param prompt - The input prompt
   * @param maxTokens - Maximum tokens to generate (default: 2000)
   * @param onToken - Optional callback for streaming tokens as they're generated
   */
  generate(prompt: string, maxTokens?: number, onToken?: TokenCallback): Promise<string>;

  /**
   * Check if the engine is ready for generation.
   */
  isReady(): boolean;

  /**
   * Get the model ID being used.
   */
  getModelId(): string;

  /**
   * Clean up resources. Call when switching models.
   */
  dispose(): Promise<void>;
}

