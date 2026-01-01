import type { ModelConfig } from '../../shared/components';

// Re-export for convenience
export type { ModelConfig };

/**
 * Available models for the HTML experiment
 */
export const AVAILABLE_MODELS: ModelConfig[] = [
  // ─────────────────────────────────────────────────────────────────
  // WebLLM (MLC) Models
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'smollm-360m',
    name: 'SmolLM (360M)',
    backend: 'webllm',
    modelId: 'SmolLM2-360M-Instruct-q4f16_1-MLC',
    size: '360M',
    downloadSize: '~500MB',
    downloadSizeGB: 0.5,
    memoryRequired: 4,
    description: 'Fast and lightweight, good for quick tests',
    recommended: true,
  },
  {
    id: 'smollm-1.7b',
    name: 'SmolLM (1.7B)',
    backend: 'webllm',
    modelId: 'SmolLM2-1.7B-Instruct-q4f16_1-MLC',
    size: '1.7B',
    downloadSize: '~1GB',
    downloadSizeGB: 1.0,
    memoryRequired: 4,
    description: 'Better quality, moderate size',
  },
  {
    id: 'llama-1b',
    name: 'Llama 3.2 (1B)',
    backend: 'webllm',
    modelId: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    size: '1B',
    downloadSize: '~700MB',
    downloadSizeGB: 0.7,
    memoryRequired: 4,
    description: 'Good balance of speed and quality',
  },
  {
    id: 'phi-3.5',
    name: 'Phi 3.5 Mini',
    backend: 'webllm',
    modelId: 'Phi-3.5-mini-instruct-q4f16_1-MLC',
    size: '3.8B',
    downloadSize: '~2GB',
    downloadSizeGB: 2.0,
    memoryRequired: 6,
    description: 'High quality, larger model',
  },

  // ─────────────────────────────────────────────────────────────────
  // Transformers.js (ONNX) Models
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'qwen-0.5b',
    name: 'Qwen 2.5 (0.5B)',
    backend: 'transformers',
    modelId: 'onnx-community/Qwen2.5-0.5B-Instruct',
    size: '0.5B',
    downloadSize: '~300MB',
    downloadSizeGB: 0.3,
    memoryRequired: 2,
    description: 'Fast and lightweight',
  },
  {
    id: 'gemma-270m',
    name: 'Gemma 3 (270M)',
    backend: 'transformers',
    modelId: 'onnx-community/gemma-3-270m-it-ONNX',
    size: '270M',
    downloadSize: '~200MB',
    downloadSizeGB: 0.2,
    memoryRequired: 2,
    description: 'Tiny, quick experiments',
  },
  {
    id: 'gemma-1b',
    name: 'Gemma 3 (1B)',
    backend: 'transformers',
    modelId: 'onnx-community/gemma-3-1b-it-ONNX-GQA',
    size: '1B',
    downloadSize: '~600MB',
    downloadSizeGB: 0.6,
    memoryRequired: 4,
    description: 'Balanced performance',
  },
  {
    id: 'llama-3.2-1b-onnx',
    name: 'Llama 3.2 (1B) ONNX',
    backend: 'transformers',
    modelId: 'onnx-community/Llama-3.2-1B-Instruct-ONNX',
    size: '1B',
    downloadSize: '~2.5GB',
    downloadSizeGB: 2.5,
    memoryRequired: 4,
    description: 'Good quality with ONNX backend',
  },
];

/** Default model ID */
export const DEFAULT_MODEL_ID = 'smollm-360m';

/**
 * Get model config by ID
 */
export function getModelConfig(modelId: string): ModelConfig {
  const config = AVAILABLE_MODELS.find((m) => m.id === modelId);
  if (!config) {
    console.warn(`Model "${modelId}" not found, using default`);
    return AVAILABLE_MODELS.find((m) => m.id === DEFAULT_MODEL_ID)!;
  }
  return config;
}

