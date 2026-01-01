import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModelSelector } from '../shared/components';
import {
  checkCompatibility,
  type CompatibilityResult,
  getSavedModelId,
  saveModelId,
  getModelConfig,
  AVAILABLE_MODELS,
} from './llm';
import { AlertTriangle, CheckCircle, Download, Zap, ArrowLeft, Sparkles, Info } from 'lucide-react';

export default function CanvasLanding() {
  const [compat, setCompat] = useState<CompatibilityResult | null>(null);
  const [checking, setChecking] = useState(true);
  const [selectedModelId, setSelectedModelId] = useState(getSavedModelId);

  const selectedModel = getModelConfig(selectedModelId);

  useEffect(() => {
    void checkCompatibility().then((result) => {
      setCompat(result);
      setChecking(false);
    });
  }, []);

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    saveModelId(modelId);
  };

  const canStart = compat?.canRun;

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Back link */}
        <Link
          to="/lab"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to Lab</span>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-purple-500 font-mono text-sm mb-4">
            <Sparkles size={16} />
            <span>// experiment.canvas</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 mb-4">Living Canvas</h1>
          <p className="text-text-muted text-lg leading-relaxed">
            An ambient, ever-changing visual experience driven by AI-generated moods.
            Watch the interface breathe, pulse, and evolve as a local model
            continuously generates atmospheric descriptions.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-page-elevated rounded-lg p-6 mb-8 border border-border-subtle">
          <h3 className="font-mono text-sm text-purple-500 mb-4">How it works</h3>
          <ul className="text-sm text-text-muted space-y-2">
            <li>1. The model continuously generates short mood phrases</li>
            <li>2. Each phrase is interpreted for colors, energy, and chaos</li>
            <li>3. The canvas smoothly transitions to match each mood</li>
            <li>4. You can optionally nudge the direction ("warmer", "calmer")</li>
          </ul>
          <div className="mt-4 p-3 bg-page rounded font-mono text-xs overflow-x-auto">
            <span className="text-purple-400">"The atmosphere feels</span>
            <span className="text-emerald-400"> ocean calm flowing"</span>
            <span className="text-text-muted"> → </span>
            <span className="text-cyan-400">blue, slow, smooth</span>
          </div>
        </div>

        {/* Key insight */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Why This Works</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Small models excel at generating evocative phrases—they don't need to
                follow complex instructions. The visual system <em>interprets</em> their
                output rather than executing it, so there's no "wrong" answer.
                Unexpected outputs become artistic surprises.
              </p>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-8">
          <ModelSelector
            models={AVAILABLE_MODELS}
            selectedModelId={selectedModelId}
            onModelChange={handleModelChange}
          />
        </div>

        {/* Warning Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Download className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-500 mb-2">Model Download Required</h3>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>{selectedModel.downloadSize}</strong> model download (cached after first load)</li>
                <li>• Requires <strong>WebGPU</strong> (Chrome 113+, Edge 113+, Safari 18+)</li>
                <li>• Recommended: <strong>{selectedModel.memoryRequired}GB+ available memory</strong></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compatibility Check */}
        <div className="bg-page-elevated rounded-lg p-6 mb-8 border border-border-subtle">
          <h3 className="font-mono text-sm text-text-muted mb-4">System Check</h3>

          {checking ? (
            <div className="text-text-muted flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              Checking compatibility...
            </div>
          ) : compat && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {compat.webgpu ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
                <span className="text-text-primary">
                  WebGPU: {compat.webgpu ? 'Available' : 'Not available'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-text-primary">Browser: {compat.browser}</span>
              </div>

              <div className="flex items-start gap-3 mt-2 pt-2 border-t border-border-subtle">
                <Info className="w-4 h-4 text-text-muted flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-muted">
                  Smaller, faster models work best for continuous generation.
                </span>
              </div>

              {!compat.canRun && compat.reason && (
                <div className="text-red-400 text-sm mt-2 p-3 bg-red-500/10 rounded">
                  {compat.reason}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <Link
          to={canStart ? "/lab/canvas/playground" : "#"}
          onClick={(e) => !canStart && e.preventDefault()}
          className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors
            ${canStart
              ? 'bg-purple-500 text-white hover:bg-purple-400'
              : 'bg-text-muted/20 text-text-muted cursor-not-allowed'
            }`}
        >
          <Zap className="w-5 h-5" />
          Enter the Canvas
        </Link>
      </div>
    </div>
  );
}

