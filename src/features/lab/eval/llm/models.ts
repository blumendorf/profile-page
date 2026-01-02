import type { ModelConfig } from '../../shared/components';

// Re-export for convenience
export type { ModelConfig };

/**
 * Available models for the Eval experiment
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
  {
    id: 'llama-3b',
    name: 'Llama 3.2 (3B)',
    backend: 'webllm',
    modelId: 'Llama-3.2-3B-Instruct-q4f16_1-MLC',
    size: '3B',
    downloadSize: '~1.8GB',
    downloadSizeGB: 1.8,
    memoryRequired: 6,
    description: 'Higher quality Llama model',
  },
  {
    id: 'qwen-coder-3b',
    name: 'Qwen 2.5 Coder (3B)',
    backend: 'webllm',
    modelId: 'Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC',
    size: '3B',
    downloadSize: '~1.8GB',
    downloadSizeGB: 1.8,
    memoryRequired: 6,
    description: 'Optimized for code generation',
    recommended: true,
  },
  {
    id: 'qwen3-1.7b',
    name: 'Qwen 3 (1.7B)',
    backend: 'webllm',
    modelId: 'Qwen3-1.7B-q4f16_1-MLC',
    size: '1.7B',
    downloadSize: '~1GB',
    downloadSizeGB: 1.0,
    memoryRequired: 4,
    description: 'Latest Qwen architecture',
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    backend: 'webllm',
    modelId: 'Mistral-7B-Instruct-v0.3-q4f16_1-MLC',
    size: '7B',
    downloadSize: '~4GB',
    downloadSizeGB: 4.0,
    memoryRequired: 8,
    description: 'High quality Mistral model',
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
    downloadSize: '~800MB',
    downloadSizeGB: 0.8,
    memoryRequired: 2,
    description: 'Fast and lightweight ONNX model',
    dtype: 'q4',
  },
  {
    id: 'gemma-270m',
    name: 'Gemma 3 (270M)',
    backend: 'transformers',
    modelId: 'onnx-community/gemma-3-270m-it-ONNX',
    size: '270M',
    downloadSize: '~570MB',
    downloadSizeGB: 0.6,
    memoryRequired: 2,
    description: 'Tiny Gemma model (fp16)',
    dtype: 'fp16',
  },
  {
    id: 'gemma-1b',
    name: 'Gemma 3 (1B)',
    backend: 'transformers',
    modelId: 'onnx-community/gemma-3-1b-it-ONNX-GQA',
    size: '1B',
    downloadSize: '~2GB',
    downloadSizeGB: 2.0,
    memoryRequired: 4,
    description: 'Balanced Gemma model (fp16)',
    dtype: 'fp16',
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
    description: 'Good quality ONNX Llama (fp16)',
    dtype: 'fp16',
  },
];

/** Default model ID */
export const DEFAULT_MODEL_ID = 'qwen-coder-3b';

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

