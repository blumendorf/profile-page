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
    return new TransformersEngine(config.modelId, config.dtype);
  }

  return new WebLLMEngine(config.modelId);
}

/**
 * LocalStorage key for persisting model selection
 */
export const MODEL_STORAGE_KEY = 'lab-html-selected-model';

/**
 * Get the saved model ID from localStorage, or default
 */
export function getSavedModelId(): string {
  if (typeof window === 'undefined') return DEFAULT_MODEL_ID;
  return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL_ID;
}

/**
 * Save the selected model ID to localStorage
 */
export function saveModelId(modelId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MODEL_STORAGE_KEY, modelId);
}

