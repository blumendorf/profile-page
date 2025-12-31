import { ChevronDown, Cpu, Sparkles, HardDrive, Zap } from 'lucide-react';
import { AVAILABLE_MODELS, type ModelConfig } from './models';

interface ModelSelectorProps {
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
  disabled?: boolean;
}

export function ModelSelector({ selectedModelId, onModelChange, disabled }: ModelSelectorProps) {
  const selectedModel = AVAILABLE_MODELS.find((m) => m.id === selectedModelId) || AVAILABLE_MODELS[0];

  // Group models by backend
  const webllmModels = AVAILABLE_MODELS.filter((m) => m.backend === 'webllm');
  const transformersModels = AVAILABLE_MODELS.filter((m) => m.backend === 'transformers');

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-mono text-text-muted mb-2 block">Select Model</span>
        <div className="relative">
          <select
            value={selectedModelId}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={disabled}
            className="w-full bg-page-elevated border border-border-subtle rounded-lg px-4 py-3
                       text-text-primary appearance-none cursor-pointer
                       focus:outline-none focus:border-accent transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <optgroup label="WebLLM (MLC)">
              {webllmModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} • {model.size} • {model.downloadSize}
                  {model.recommended ? ' ★' : ''}
                </option>
              ))}
            </optgroup>
            <optgroup label="Transformers.js (ONNX)">
              {transformersModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} • {model.size} • {model.downloadSize}
                </option>
              ))}
            </optgroup>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
        </div>
      </label>

      {/* Selected model details */}
      <ModelDetails model={selectedModel} />
    </div>
  );
}

function ModelDetails({ model }: { model: ModelConfig }) {
  return (
    <div className="bg-page-elevated rounded-lg p-4 border border-border-subtle">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-text-primary flex items-center gap-2">
            {model.name}
            {model.recommended && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">
                Recommended
              </span>
            )}
          </h4>
          <p className="text-sm text-text-muted mt-1">{model.description}</p>
        </div>
        <span className="text-xs font-mono text-text-muted bg-page px-2 py-1 rounded">
          {model.backend}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2 text-text-muted">
          <Cpu className="w-4 h-4" />
          <span>{model.size}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <HardDrive className="w-4 h-4" />
          <span>{model.downloadSize}</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Zap className="w-4 h-4" />
          <span>{model.memoryRequired}GB RAM</span>
        </div>
      </div>

      {model.backend === 'transformers' && (
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-500">
          <Sparkles className="w-3 h-3" />
          <span>Uses transformers.js with WebGPU acceleration</span>
        </div>
      )}
    </div>
  );
}

