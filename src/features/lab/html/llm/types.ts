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
 * Configuration for text generation
 */
export interface GenerationConfig {
  /** Maximum tokens to generate (default: 600) */
  maxTokens?: number;
  /** Temperature for sampling (default: 0.25) */
  temperature?: number;
  /** Nucleus sampling threshold (default: 0.9) */
  topP?: number;
  /** Penalty for repeating tokens (default: 1.1, transformers.js only) */
  repetitionPenalty?: number;
  /** Stop sequences to end generation early */
  stop?: string[];
}

/** Default generation config optimized for structured HTML output */
export const DEFAULT_GENERATION_CONFIG: Required<Omit<GenerationConfig, 'stop'>> & Pick<GenerationConfig, 'stop'> = {
  maxTokens: 600,
  temperature: 0.25,
  topP: 0.9,
  repetitionPenalty: 1.1,
  stop: ['</html>'],
};

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
   * @param config - Generation configuration (uses defaults if not provided)
   * @param onToken - Optional callback for streaming tokens as they're generated
   */
  generate(prompt: string, config?: GenerationConfig, onToken?: TokenCallback): Promise<string>;

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
  dispose(): void | Promise<void>;
}

