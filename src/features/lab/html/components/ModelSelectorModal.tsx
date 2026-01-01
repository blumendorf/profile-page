import { useState, useEffect } from 'react';
import { X, Cpu, HardDrive, Zap, Sparkles, AlertTriangle, CheckCircle, Download, Loader2 } from 'lucide-react';
import type { ModelConfig } from '../../shared/components';
import { checkCompatibility, type CompatibilityResult } from '../llm';

interface ModelSelectorModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Callback when a model is selected and load button is clicked */
  onLoadModel: (modelId: string) => void;
  /** Available models to choose from */
  models: ModelConfig[];
  /** Currently selected model ID (for highlighting current selection) */
  currentModelId?: string;
  /** Whether a model is currently loading (disables actions) */
  isLoading?: boolean;
}

export function ModelSelectorModal({
  isOpen,
  onClose,
  onLoadModel,
  models,
  currentModelId,
  isLoading = false,
}: ModelSelectorModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(currentModelId ?? null);
  const [compat, setCompat] = useState<CompatibilityResult | null>(null);
  const [checkingCompat, setCheckingCompat] = useState(true);

  // Check compatibility on mount
  useEffect(() => {
    if (isOpen) {
      void checkCompatibility().then((result) => {
        setCompat(result);
        setCheckingCompat(false);
      });
    }
  }, [isOpen]);

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedId(currentModelId ?? null);
    }
  }, [isOpen, currentModelId]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const selectedModel = selectedId ? models.find((m) => m.id === selectedId) : null;
  const webllmModels = models.filter((m) => m.backend === 'webllm');
  const transformersModels = models.filter((m) => m.backend === 'transformers');

  const canLoad = compat?.canRun && selectedId && !isLoading;

  const handleLoad = () => {
    if (canLoad && selectedId) {
      onLoadModel(selectedId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-page rounded-xl border border-border-subtle shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-selector-title"
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <h2 id="model-selector-title" className="text-xl font-semibold text-text-primary">
            Select Model
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-page-elevated transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Compatibility Check */}
          <div className="bg-page-elevated rounded-lg p-4 border border-border-subtle">
            <h3 className="font-mono text-sm text-text-muted mb-3">System Check</h3>
            {checkingCompat ? (
              <div className="text-text-muted flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking compatibility...
              </div>
            ) : compat && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {compat.webgpu ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-text-primary">
                    WebGPU: {compat.webgpu ? 'Available' : 'Not available'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-text-primary">Browser: {compat.browser}</span>
                </div>
                {!compat.canRun && compat.reason && (
                  <div className="text-red-400 text-sm mt-2 p-3 bg-red-500/10 rounded">
                    {compat.reason}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* WebLLM Models */}
          {webllmModels.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-cyan-500 mb-3 flex items-center gap-2">
                <Cpu size={14} />
                WebLLM (MLC)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {webllmModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    isSelected={selectedId === model.id}
                    isCurrent={currentModelId === model.id}
                    onClick={() => setSelectedId(model.id)}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Transformers.js Models */}
          {transformersModels.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-amber-500 mb-3 flex items-center gap-2">
                <Sparkles size={14} />
                Transformers.js (ONNX)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {transformersModels.map((model) => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    isSelected={selectedId === model.id}
                    isCurrent={currentModelId === model.id}
                    onClick={() => setSelectedId(model.id)}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with selected model info and actions */}
        <div className="flex-shrink-0 border-t border-border-subtle bg-page-elevated px-6 py-4">
          {selectedModel ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-text-primary truncate">{selectedModel.name}</span>
                  {selectedModel.recommended && (
                    <span className="text-xs bg-cyan-500/20 text-cyan-500 px-2 py-0.5 rounded flex-shrink-0">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Download size={12} />
                    {selectedModel.downloadSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={12} />
                    {selectedModel.memoryRequired}GB RAM
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoad}
                  disabled={!canLoad}
                  className="px-6 py-2 bg-cyan-500 text-bg-page rounded-lg font-semibold text-sm
                           flex items-center gap-2 hover:bg-cyan-400 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Load Model
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-sm">Select a model to continue</span>
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 text-sm text-text-muted hover:text-text-primary transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ModelCardProps {
  model: ModelConfig;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ModelCard({ model, isSelected, isCurrent, onClick, disabled }: ModelCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border transition-all
        ${isSelected
          ? 'border-cyan-500 bg-cyan-500/10 ring-1 ring-cyan-500/50'
          : 'border-border-subtle bg-page-elevated hover:border-text-muted'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-text-primary">{model.name}</h4>
          {model.recommended && (
            <span className="text-xs bg-cyan-500/20 text-cyan-500 px-1.5 py-0.5 rounded">
              ★
            </span>
          )}
          {isCurrent && (
            <span className="text-xs bg-emerald-500/20 text-emerald-500 px-1.5 py-0.5 rounded">
              Current
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-text-muted bg-page px-2 py-0.5 rounded">
          {model.backend === 'webllm' ? 'MLC' : 'ONNX'}
        </span>
      </div>

      <p className="text-sm text-text-muted mb-3">{model.description}</p>

      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <Cpu size={12} />
          {model.size}
        </span>
        <span className="flex items-center gap-1">
          <HardDrive size={12} />
          {model.downloadSize}
        </span>
        <span className="flex items-center gap-1">
          <Zap size={12} />
          {model.memoryRequired}GB
        </span>
      </div>
    </button>
  );
}

