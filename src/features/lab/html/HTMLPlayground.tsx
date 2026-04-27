import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DownloadProgress,
  CrossTabWarning,
  CrossTabIndicator,
  BackLink,
  EmptyState,
  ErrorPanel,
  InfoPanel,
  SliderField,
  StatusDot,
  StatsBar,
  TabList,
} from '../shared/components';
import { useCrossTabModel } from '../shared/hooks';
import {
  createEngine,
  saveModelId,
  getModelConfig,
  AVAILABLE_MODELS,
  type LLMEngine,
} from './llm';
import { Settings2, RefreshCw } from 'lucide-react';
import { generateHTMLWithEngine, DEFAULT_HTML, DEFAULT_HTML_GENERATION_CONFIG, type GenerationResult } from './html-generator';
import type { GenerationConfig } from './llm';
import { HTMLPreview } from './HTMLPreview';
import { LogPanel } from './LogPanel';
import { createLogEntry, type LogEntry } from './log-utils';
import { ModelSelectorModal } from './components';
import {
  Code2,
  Sparkles,
  Loader2,
  Code,
  Eye,
  RotateCcw,
  Trash2,
  Terminal,
  FileText,
  Zap,
} from 'lucide-react';

type TabId = 'preview' | 'code' | 'raw' | 'logs';

export default function HTMLPlayground() {
  const [downloadState, setDownloadState] = useState<{
    stage: 'downloading' | 'loading' | 'ready';
    progress: number;
    text: string;
  } | null>(null);

  const [html, setHtml] = useState(DEFAULT_HTML);
  const [rawOutput, setRawOutput] = useState('');
  const [streamingOutput, setStreamingOutput] = useState('');
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('preview');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<{
    generationTimeMs: number;
    tokenCount: number;
  } | null>(null);

  // Generation config state
  const [generationConfig, setGenerationConfig] = useState<GenerationConfig>({
    maxTokens: DEFAULT_HTML_GENERATION_CONFIG.maxTokens,
    temperature: DEFAULT_HTML_GENERATION_CONFIG.temperature,
    topP: DEFAULT_HTML_GENERATION_CONFIG.topP,
    repetitionPenalty: DEFAULT_HTML_GENERATION_CONFIG.repetitionPenalty,
  });
  const [showSettings, setShowSettings] = useState(false);

  // Model selection state - null means no model selected yet
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const selectedModel = selectedModelId ? getModelConfig(selectedModelId) : null;

  // Cross-tab coordination
  const {
    isModelInUseByOtherTab,
    otherTabInfo,
    updateStatus,
    warningDismissed,
    dismissWarning,
  } = useCrossTabModel();

  // Keep engine in a ref to persist across renders
  const engineRef = useRef<LLMEngine | null>(null);

  // Track previous model for cancel functionality
  const previousModelIdRef = useRef<string | null>(null);

  // Flag to suppress download overlay during silent reload (after cancel)
  const silentReloadRef = useRef(false);

  // Add a log entry
  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    setLogs((prev) => [...prev, createLogEntry(level, message)]);
  }, []);

  // Initialize model when selectedModelId changes (and is not null)
  useEffect(() => {
    // Don't initialize if no model is selected
    if (!selectedModelId) {
      return;
    }

    let cancelled = false;
    const model = getModelConfig(selectedModelId);

    addLog('info', `Creating engine for ${model.name}...`);
    updateStatus('loading', selectedModelId);

    const engine = createEngine(selectedModelId);
    engineRef.current = engine;

    if (engine.isReady()) {
      setModelReady(true);
      setDownloadState(null);
      updateStatus('ready', selectedModelId);
      previousModelIdRef.current = null;
      silentReloadRef.current = false;
      addLog('success', 'Model already loaded and ready');
      return;
    }

    // Show download progress
    setDownloadState({ stage: 'downloading', progress: 0, text: 'Initializing...' });

    engine.initialize((progress) => {
      if (cancelled) return;

      if (!silentReloadRef.current) {
        setDownloadState(progress);
      }
      if (progress.stage === 'downloading') {
        if (progress.progress % 20 === 0) {
          addLog('info', `Downloading: ${progress.progress}%`);
        }
      } else if (progress.stage === 'loading') {
        addLog('info', 'Loading into GPU memory...');
      } else if (progress.stage === 'ready') {
        setModelReady(true);
        updateStatus('ready', selectedModelId);
        addLog('success', 'Model ready for generation');
        previousModelIdRef.current = null;
        silentReloadRef.current = false;
        setTimeout(() => setDownloadState(null), 800);
      }
    }).catch((err: Error) => {
      if (cancelled) return;

      console.error('Model init failed:', err);
      const errorMessage = err.message || 'Unknown error';
      addLog('error', `Initialization failed: ${errorMessage}`);
      updateStatus('error', selectedModelId);

      if (errorMessage.includes('Unsupported model type')) {
        setError(`Model "${model.name}" is not supported. Please select a different model.`);
      } else if (errorMessage.includes('WebGPU')) {
        setError('Failed to initialize model. Your browser may not support WebGPU.');
      } else {
        setError(`Failed to load model: ${errorMessage}`);
      }
      setDownloadState(null);
    });

    return () => {
      cancelled = true;
      updateStatus('idle', '');
      if (engineRef.current) {
        const result = engineRef.current.dispose();
        if (result && typeof result.catch === 'function') {
          result.catch(console.error);
        }
      }
    };
  }, [selectedModelId, addLog, updateStatus]);

  const handleGenerate = async () => {
    if (!input.trim() || isGenerating || !modelReady || !engineRef.current || !selectedModelId) return;

    setIsGenerating(true);
    updateStatus('generating', selectedModelId);
    setError(null);
    setStreamingOutput('');
    setRawOutput('');
    setStats(null);

    addLog('info', `Generating HTML for: "${input}"`);
    addLog('info', 'Sending prompt to model...');

    try {
      const result: GenerationResult = await generateHTMLWithEngine(
        input,
        html,
        engineRef.current,
        (token) => {
          setStreamingOutput((prev) => prev + token);
        },
        generationConfig
      );

      setRawOutput(result.rawOutput);
      setHtml(result.html);
      setStats({
        generationTimeMs: result.generationTimeMs,
        tokenCount: result.tokenCount,
      });

      addLog('success', `Generation complete in ${(result.generationTimeMs / 1000).toFixed(1)}s`);
      addLog('info', `Generated ~${result.tokenCount} tokens`);
    } catch (err) {
      console.error('HTML generation failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Generation failed: ${errorMessage}`);
      addLog('error', `Generation failed: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
      updateStatus('ready', selectedModelId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleGenerate();
  };

  const handleReset = () => {
    setHtml(DEFAULT_HTML);
    setRawOutput('');
    setStreamingOutput('');
    setStats(null);
    setError(null);
    addLog('info', 'Reset to default state');
  };

  const handleClear = () => {
    setInput('');
    setRawOutput('');
    setStreamingOutput('');
    setStats(null);
    setError(null);
    addLog('info', 'Cleared input and output');
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleLoadModel = (newModelId: string) => {
    // Close modal
    setShowModelModal(false);

    // If same model and already ready, do nothing
    if (newModelId === selectedModelId && modelReady) {
      return;
    }

    // Save current model as previous (for cancel functionality) if we have one
    if (selectedModelId) {
      previousModelIdRef.current = selectedModelId;
    }

    // Dispose current engine if exists
    if (engineRef.current) {
      const result = engineRef.current.dispose();
      if (result && typeof result.catch === 'function') {
        result.catch(console.error);
      }
      engineRef.current = null;
    }

    // Reset state for new model
    setModelReady(false);
    setError(null);

    // Save and update selection (triggers useEffect to initialize new model)
    saveModelId(newModelId);
    setSelectedModelId(newModelId);

    addLog('info', `Loading model: ${getModelConfig(newModelId).name}`);
  };

  const handleCancelDownload = () => {
    const previousModelId = previousModelIdRef.current;

    // Close the popup immediately
    setDownloadState(null);

    // Dispose the current engine to stop download
    if (engineRef.current) {
      const result = engineRef.current.dispose();
      if (result && typeof result.catch === 'function') {
        result.catch(console.error);
      }
      engineRef.current = null;
    }

    // If we have a previous model, switch back to it
    if (previousModelId) {
      addLog('info', `Download cancelled, reverting to ${getModelConfig(previousModelId).name}`);
      previousModelIdRef.current = null;
      silentReloadRef.current = true;
      saveModelId(previousModelId);
      setSelectedModelId(previousModelId);
    } else {
      // No previous model - reset to empty state
      setSelectedModelId(null);
      setModelReady(false);
      updateStatus('idle', '');
      addLog('info', 'Download cancelled');
    }
  };

  const tabs: { id: TabId; label: string; icon: typeof Eye }[] = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'HTML', icon: Code },
    { id: 'raw', label: 'Raw Output', icon: FileText },
    { id: 'logs', label: 'Logs', icon: Terminal },
  ];

  // Check if we're in empty state (no model selected)
  const isEmptyState = !selectedModelId;

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Model Selector Modal */}
      <ModelSelectorModal
        isOpen={showModelModal}
        onClose={() => setShowModelModal(false)}
        onLoadModel={handleLoadModel}
        models={AVAILABLE_MODELS}
        currentModelId={selectedModelId ?? undefined}
        isLoading={downloadState !== null && downloadState.stage !== 'ready'}
      />

      {/* Download overlay - hide if there's an error */}
      {downloadState && downloadState.stage !== 'ready' && !error && selectedModel && (
        <DownloadProgress
          {...downloadState}
          downloadSizeGB={selectedModel.downloadSizeGB}
          modelName={selectedModel.name}
          onCancel={handleCancelDownload}
        />
      )}

      {/* Header bar */}
      <div className="shrink-0 bg-page/95 backdrop-blur-xs border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <BackLink display="flex" hoverAccentClassName="hover:text-cyan-500" />

          <div className="flex items-center gap-2 text-cyan-500 font-mono text-sm">
            <Code2 size={16} />
            <span>HTML Playground</span>
          </div>

          <div className="text-xs text-text-muted font-mono flex items-center gap-3">
            {selectedModel ? (
              <>
                {/* Change Model button */}
                <button
                  onClick={() => setShowModelModal(true)}
                  disabled={isGenerating || (downloadState !== null && downloadState.stage !== 'ready')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border-subtle rounded
                             hover:border-cyan-500/50 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw size={12} />
                  <span>{selectedModel.name}</span>
                </button>
                <CrossTabIndicator otherTab={otherTabInfo} />
                {modelReady ? (
                  <StatusDot status="ready" />
                ) : (
                  <StatusDot status="loading" />
                )}
              </>
            ) : (
              <span className="text-text-muted">No model loaded</span>
            )}
          </div>
        </div>
      </div>

      {/* Empty State - shown when no model is selected */}
      {isEmptyState ? (
        <EmptyState
          icon={<Zap className="w-8 h-8 text-cyan-500" />}
          title="Select a Model"
          description="Choose an AI model to start generating HTML. Models run entirely in your browser using WebGPU."
          footnote="First load requires downloading the model (~500MB - 4GB depending on choice)"
          action={
            <button
              type="button"
              onClick={() => setShowModelModal(true)}
              className="px-8 py-3 bg-cyan-500 text-bg-page rounded-lg font-semibold
                         flex items-center gap-2 mx-auto hover:bg-cyan-400 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Select Model
            </button>
          }
        />
      ) : (
        <>
          {/* Input bar - only show when model is selected */}
          <div className="shrink-0 bg-page/95 backdrop-blur-xs border-b border-border-subtle">
            <div className="max-w-6xl mx-auto p-4">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe any visual style you want..."
                  disabled={!modelReady || isGenerating}
                  className="flex-1 bg-surface border border-border-subtle rounded-lg px-4 py-3
                             text-text-primary placeholder:text-text-muted
                             focus:outline-hidden focus:border-cyan-500 transition-colors
                             disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!modelReady || isGenerating || !input.trim()}
                  className="px-6 py-3 bg-cyan-500 text-bg-page rounded-lg font-semibold
                             flex items-center gap-2 hover:bg-cyan-400 transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </form>

              {/* Control buttons */}
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleReset}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted
                             hover:text-text-primary border border-border-subtle rounded-lg
                             hover:border-text-muted transition-colors disabled:opacity-50"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
                <button
                  onClick={handleClear}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted
                             hover:text-text-primary border border-border-subtle rounded-lg
                             hover:border-text-muted transition-colors disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm
                             border rounded-lg transition-colors
                             ${showSettings
                               ? 'text-cyan-500 border-cyan-500/50 bg-cyan-500/10'
                               : 'text-text-muted hover:text-text-primary border-border-subtle hover:border-text-muted'
                             }`}
                >
                  <Settings2 size={14} />
                  Settings
                </button>
              </div>

              {/* Generation Settings Panel */}
              {showSettings && (
                <div className="mt-4 p-4 bg-surface border border-border-subtle rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-text-primary">Generation Settings</h3>
                    <button
                      onClick={() => setGenerationConfig({
                        maxTokens: DEFAULT_HTML_GENERATION_CONFIG.maxTokens,
                        temperature: DEFAULT_HTML_GENERATION_CONFIG.temperature,
                        topP: DEFAULT_HTML_GENERATION_CONFIG.topP,
                        repetitionPenalty: DEFAULT_HTML_GENERATION_CONFIG.repetitionPenalty,
                      })}
                      className="text-xs text-text-muted hover:text-cyan-500 transition-colors"
                    >
                      Reset to defaults
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <SliderField
                        label="Max Tokens"
                        value={generationConfig.maxTokens ?? DEFAULT_HTML_GENERATION_CONFIG.maxTokens}
                        onChange={(v) => setGenerationConfig((prev) => ({ ...prev, maxTokens: v }))}
                        min={100}
                        max={4096}
                        step={100}
                        disabled={isGenerating}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Maximum number of tokens (words/pieces) to generate. Higher = longer output but slower.
                      </p>
                    </div>

                    <div>
                      <SliderField
                        label="Temperature"
                        value={generationConfig.temperature ?? 0}
                        onChange={(v) => setGenerationConfig((prev) => ({ ...prev, temperature: v }))}
                        min={0}
                        max={2}
                        step={0.05}
                        formatValue={(v) => v.toFixed(2)}
                        disabled={isGenerating}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Controls randomness. Lower (0.0-0.3) = more focused/deterministic. Higher (0.7-1.5) = more creative/random.
                      </p>
                    </div>

                    <div>
                      <SliderField
                        label="Top P (Nucleus Sampling)"
                        value={generationConfig.topP ?? 0}
                        onChange={(v) => setGenerationConfig((prev) => ({ ...prev, topP: v }))}
                        min={0.1}
                        max={1}
                        step={0.05}
                        formatValue={(v) => v.toFixed(2)}
                        disabled={isGenerating}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Considers only tokens within this cumulative probability mass. Lower = more focused, higher = more diverse.
                      </p>
                    </div>

                    <div>
                      <SliderField
                        label="Repetition Penalty"
                        value={generationConfig.repetitionPenalty ?? 1}
                        onChange={(v) => setGenerationConfig((prev) => ({ ...prev, repetitionPenalty: v }))}
                        min={1}
                        max={2}
                        step={0.05}
                        formatValue={(v) => v.toFixed(2)}
                        disabled={isGenerating}
                      />
                      <p className="text-xs text-text-muted mt-1">
                        Penalizes repeated tokens. 1.0 = no penalty. Higher = less repetition but may reduce coherence.
                      </p>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-4">
                    <InfoPanel>
                      <strong className="text-text-primary">Tip:</strong> For HTML generation, lower temperature
                      (0.2-0.5) and high top_p (0.9) work well. Increase max tokens if output is being cut off.
                    </InfoPanel>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cross-tab warning */}
          {isModelInUseByOtherTab && otherTabInfo && (
            <div className="max-w-6xl mx-auto px-4 pt-3 w-full">
              <CrossTabWarning
                otherTab={otherTabInfo}
                onDismiss={dismissWarning}
                dismissed={warningDismissed}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="max-w-6xl mx-auto px-4 py-3 w-full">
              <ErrorPanel message={error}>
                <button
                  type="button"
                  onClick={() => setShowModelModal(true)}
                  className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 underline"
                >
                  <RefreshCw size={14} />
                  Select a different model
                </button>
              </ErrorPanel>
            </div>
          )}

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs */}
            <div className="shrink-0 border-b border-border-subtle">
              <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
                <TabList
                  active={activeTab}
                  onChange={setActiveTab}
                  tabs={tabs.map((tab) => ({
                    id: tab.id,
                    label: tab.label,
                    icon: tab.icon,
                    suffix:
                      tab.id === 'logs' && logs.length > 0 ? (
                        <span className="text-xs opacity-60">({logs.length})</span>
                      ) : undefined,
                  }))}
                />

                {activeTab === 'logs' && logs.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearLogs}
                    className="text-xs text-text-muted hover:text-text-primary transition-colors"
                  >
                    Clear logs
                  </button>
                )}
              </div>
            </div>

            {/* Tab content - all stay mounted */}
            <div className="flex-1 flex flex-col min-h-0 p-4">
              <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
                {/* Preview */}
                <div className={`flex-1 min-h-0 ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
                  <HTMLPreview html={html} className="h-full min-h-[500px]" />
                </div>

                {/* HTML Code (Editable) */}
                <div className={`flex-1 min-h-0 flex-col ${activeTab === 'code' ? 'flex' : 'hidden'}`}>
                  <div className="flex-1 min-h-0 bg-surface rounded-lg border border-border-subtle overflow-hidden flex flex-col">
                    <div className="shrink-0 px-4 py-2 border-b border-border-subtle flex items-center justify-between">
                      <span className="text-xs text-text-muted font-mono">Edit HTML to update preview</span>
                    </div>
                    <textarea
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      spellCheck={false}
                      className="flex-1 min-h-0 w-full p-4 text-sm font-mono text-text-primary bg-transparent
                                 resize-none focus:outline-hidden"
                      style={{ tabSize: 2 }}
                    />
                  </div>
                </div>

                {/* Raw Output */}
                <div className={`flex-1 min-h-0 ${activeTab === 'raw' ? 'block' : 'hidden'}`}>
                  <div className="h-full bg-surface rounded-lg border border-border-subtle overflow-auto">
                    <div className="p-4">
                      <div className="text-xs text-text-muted mb-2 font-mono">
                        Raw model output (HTML):
                      </div>
                      <pre className="text-sm font-mono text-emerald-400 whitespace-pre-wrap">
                        {isGenerating ? (
                          <>
                            {streamingOutput}
                            <span className="animate-pulse">▊</span>
                          </>
                        ) : rawOutput || (
                          <span className="text-text-muted opacity-50">
                            No output yet. Generate something to see the raw model response.
                          </span>
                        )}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Logs */}
                <div className={`flex-1 min-h-0 ${activeTab === 'logs' ? 'block' : 'hidden'}`}>
                  <LogPanel logs={logs} className="h-full" />
                </div>
              </div>
            </div>

            <StatsBar
              modelBackendLabel={selectedModel ? selectedModel.backend : undefined}
              stats={stats ?? null}
              isGenerating={isGenerating}
            />
          </div>
        </>
      )}
    </div>
  );
}
