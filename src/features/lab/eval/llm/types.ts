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
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Temperature for sampling */
  temperature?: number;
  /** Nucleus sampling threshold */
  topP?: number;
  /** Penalty for repeating tokens (transformers.js only) */
  repetitionPenalty?: number;
  /** Stop sequences to end generation early */
  stop?: string[];
}

/** Default generation config for eval */
export const DEFAULT_GENERATION_CONFIG: Required<Omit<GenerationConfig, 'stop'>> & Pick<GenerationConfig, 'stop'> = {
  maxTokens: 600,
  temperature: 0.25,
  topP: 0.9,
  repetitionPenalty: 1.1,
  stop: ['</html>'],
};

/**
 * Common interface for all LLM engine implementations.
 */
export interface LLMEngine {
  /**
   * Initialize the model. Downloads if necessary.
   */
  initialize(onProgress?: ProgressCallback): Promise<void>;

  /**
   * Generate text from a prompt.
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
   * Clean up resources.
   */
  dispose(): void | Promise<void>;
}

