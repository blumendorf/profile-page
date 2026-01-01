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

/** Default generation config */
export const DEFAULT_GENERATION_CONFIG: Required<Omit<GenerationConfig, 'stop'>> & Pick<GenerationConfig, 'stop'> = {
  maxTokens: 200,
  temperature: 0.3,
  topP: 0.9,
  repetitionPenalty: 1.1,
  stop: undefined,
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

