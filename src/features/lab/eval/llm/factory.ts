import type { LLMEngine } from "./types";
import { getModelConfig, DEFAULT_MODEL_ID } from "./models";
import { WebLLMEngine } from "./webllm-engine";
import { TransformersEngine } from "./transformers-engine";

/**
 * Create an LLM engine for the specified model
 */
export function createEngine(modelId: string = DEFAULT_MODEL_ID): LLMEngine {
  const config = getModelConfig(modelId);

  console.log(`[factory] Creating engine for model: ${config.name} (${config.backend})`);

  if (config.backend === 'transformers') {
    return new TransformersEngine(config.modelId);
  }

  return new WebLLMEngine(config.modelId);
}

