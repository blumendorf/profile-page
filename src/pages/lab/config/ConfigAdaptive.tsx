import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { webllmEngine, DownloadProgress } from '../shared';
import { generateUIConfig } from './config-generator';
import { UIConfig, DEFAULT_CONFIG } from './ui-config';
import { IntentInput } from './IntentInput';
import { ConfigProfile } from './ConfigProfile';
import { ArrowLeft, Settings2 } from 'lucide-react';

export default function ConfigAdaptive() {
  const [downloadState, setDownloadState] = useState<{
    stage: 'downloading' | 'loading' | 'ready';
    progress: number;
    text: string;
  } | null>({ stage: 'downloading', progress: 0, text: 'Initializing...' });

  const [config, setConfig] = useState<UIConfig>(DEFAULT_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize model on mount
  useEffect(() => {
    if (webllmEngine.isReady()) {
      setModelReady(true);
      setDownloadState(null);
      return;
    }

    webllmEngine.initialize((progress) => {
      setDownloadState(progress);
      if (progress.stage === 'ready') {
        setModelReady(true);
        setTimeout(() => setDownloadState(null), 800);
      }
    }).catch((err) => {
      console.error('WebLLM init failed:', err);
      setError('Failed to initialize model. Your browser may not support WebGPU.');
      setDownloadState(null);
    });
  }, []);

  const handleGenerate = async (intent: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const newConfig = await generateUIConfig(intent);
      setConfig(newConfig);
    } catch (err) {
      console.error('Generation failed:', err);
      setError('Failed to generate config. Using default.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-page">
      {/* Download overlay */}
      {downloadState && downloadState.stage !== 'ready' && (
        <DownloadProgress {...downloadState} />
      )}

      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-page/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/lab/config"
            className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <div className="flex items-center gap-2 text-accent font-mono text-sm">
            <Settings2 size={16} />
            <span>Config Generator</span>
          </div>

          <div className="text-xs text-text-muted font-mono">
            {modelReady ? (
              <span className="text-emerald-500">● Model Ready</span>
            ) : (
              <span className="text-amber-500">● Loading...</span>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Intent input bar */}
      <IntentInput
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        disabled={!modelReady}
        lastGenerationTime={config.meta.generationTimeMs || undefined}
      />

      {/* Error message */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* The simplified profile (Hero + Contact), driven by config */}
      <ConfigProfile config={config} />
    </div>
  );
}
