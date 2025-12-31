import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  DownloadProgress,
  createEngine,
  getSavedModelId,
  getModelConfig,
  type LLMEngine,
} from '../shared';
import { generateHTMLWithEngine, DEFAULT_HTML, type GenerationResult } from './html-generator';
import { HTMLPreview } from './HTMLPreview';
import { LogPanel, createLogEntry, type LogEntry } from './LogPanel';
import {
  ArrowLeft,
  Code2,
  Sparkles,
  Loader2,
  Code,
  Eye,
  RotateCcw,
  Trash2,
  Terminal,
  FileText,
  Clock,
  Cpu,
  Hash,
} from 'lucide-react';

type TabId = 'preview' | 'code' | 'raw' | 'logs';

export default function HTMLPlayground() {
  const [downloadState, setDownloadState] = useState<{
    stage: 'downloading' | 'loading' | 'ready';
    progress: number;
    text: string;
  } | null>({ stage: 'downloading', progress: 0, text: 'Initializing...' });

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

  // Get selected model from localStorage
  const selectedModelId = getSavedModelId();
  const selectedModel = getModelConfig(selectedModelId);

  // Keep engine in a ref to persist across renders
  const engineRef = useRef<LLMEngine | null>(null);

  // Add a log entry
  const addLog = useCallback((level: LogEntry['level'], message: string) => {
    setLogs((prev) => [...prev, createLogEntry(level, message)]);
  }, []);

  // Initialize model on mount
  useEffect(() => {
    addLog('info', `Creating engine for ${selectedModel.name}...`);

    const engine = createEngine(selectedModelId);
    engineRef.current = engine;

    if (engine.isReady()) {
      setModelReady(true);
      setDownloadState(null);
      addLog('success', 'Model already loaded and ready');
      return;
    }

    engine.initialize((progress) => {
      setDownloadState(progress);
      if (progress.stage === 'downloading') {
        // Only log significant progress changes
        if (progress.progress % 20 === 0) {
          addLog('info', `Downloading: ${progress.progress}%`);
        }
      } else if (progress.stage === 'loading') {
        addLog('info', 'Loading into GPU memory...');
      } else if (progress.stage === 'ready') {
        setModelReady(true);
        addLog('success', 'Model ready for generation');
        setTimeout(() => setDownloadState(null), 800);
      }
    }).catch((err: Error) => {
      console.error('Model init failed:', err);
      const errorMessage = err.message || 'Unknown error';
      addLog('error', `Initialization failed: ${errorMessage}`);

      if (errorMessage.includes('Unsupported model type')) {
        setError(`Model "${selectedModel.name}" is not supported. Please select a different model.`);
      } else if (errorMessage.includes('WebGPU')) {
        setError('Failed to initialize model. Your browser may not support WebGPU.');
      } else {
        setError(`Failed to load model: ${errorMessage}`);
      }
      setDownloadState(null);
    });

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose().catch(console.error);
      }
    };
  }, [selectedModelId, selectedModel.name, addLog]);

  const handleGenerate = async () => {
    if (!input.trim() || isGenerating || !modelReady || !engineRef.current) return;

    setIsGenerating(true);
    setError(null);
    setStreamingOutput('');
    setRawOutput('');
    setStats(null);

    addLog('info', `Generating CSS for: "${input}"`);
    addLog('info', 'Sending prompt to model...');

    try {
      const result: GenerationResult = await generateHTMLWithEngine(
        input,
        engineRef.current,
        (token) => {
          setStreamingOutput((prev) => prev + token);
        }
      );

      setRawOutput(result.rawOutput);
      setHtml(result.html);
      setStats({
        generationTimeMs: result.generationTimeMs,
        tokenCount: result.tokenCount,
      });

      if (result.isValid) {
        addLog('success', `Generation complete in ${(result.generationTimeMs / 1000).toFixed(1)}s`);
        addLog('info', `Generated ~${result.tokenCount} tokens`);
      } else {
        addLog('warn', 'Model output was not valid CSS, using default styles');
      }
    } catch (err) {
      console.error('HTML generation failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Generation failed: ${errorMessage}`);
      addLog('error', `Generation failed: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
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

  const tabs: { id: TabId; label: string; icon: typeof Eye }[] = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'HTML', icon: Code },
    { id: 'raw', label: 'Raw Output', icon: FileText },
    { id: 'logs', label: 'Logs', icon: Terminal },
  ];

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Download overlay - hide if there's an error */}
      {downloadState && downloadState.stage !== 'ready' && !error && (
        <DownloadProgress
          {...downloadState}
          downloadSizeGB={selectedModel.downloadSizeGB}
          modelName={selectedModel.name}
        />
      )}

      {/* Header bar */}
      <div className="flex-shrink-0 bg-page/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="/lab/html"
            className="flex items-center gap-2 text-text-muted hover:text-cyan-500 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </Link>

          <div className="flex items-center gap-2 text-cyan-500 font-mono text-sm">
            <Code2 size={16} />
            <span>HTML Playground</span>
          </div>

          <div className="text-xs text-text-muted font-mono flex items-center gap-3">
            <span className="text-text-muted/70">{selectedModel.name}</span>
            {modelReady ? (
              <span className="text-emerald-500">● Ready</span>
            ) : (
              <span className="text-amber-500">● Loading...</span>
            )}
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 bg-page/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe any visual style you want..."
              disabled={!modelReady || isGenerating}
              className="flex-1 bg-page-elevated border border-border-subtle rounded-lg px-4 py-3
                         text-text-primary placeholder:text-text-muted
                         focus:outline-none focus:border-cyan-500 transition-colors
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
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 py-3 w-full">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm mb-3">{error}</p>
            <Link
              to="/lab/html"
              className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 underline"
            >
              <ArrowLeft size={14} />
              Go back to select a different model
            </Link>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs */}
        <div className="flex-shrink-0 border-b border-border-subtle">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'bg-cyan-500/20 text-cyan-500'
                      : 'text-text-muted hover:text-text-primary'
                    }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {tab.id === 'logs' && logs.length > 0 && (
                    <span className="text-xs opacity-60">({logs.length})</span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'logs' && logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Clear logs
              </button>
            )}
          </div>
        </div>

        {/* Tab content - all stay mounted */}
        <div className="flex-1 p-4 min-h-0">
          <div className="max-w-6xl mx-auto h-full">
            {/* Preview */}
            <div className={`h-full ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
              <HTMLPreview html={html} className="h-full min-h-[500px]" />
            </div>

            {/* HTML Code */}
            <div className={`h-full ${activeTab === 'code' ? 'block' : 'hidden'}`}>
              <div className="h-full bg-page-elevated rounded-lg border border-border-subtle overflow-auto">
                <pre className="p-4 text-xs font-mono text-text-muted whitespace-pre-wrap">
                  {html}
                </pre>
              </div>
            </div>

            {/* Raw Output */}
            <div className={`h-full ${activeTab === 'raw' ? 'block' : 'hidden'}`}>
              <div className="h-full bg-page-elevated rounded-lg border border-border-subtle overflow-auto">
                <div className="p-4">
                  <div className="text-xs text-text-muted mb-2 font-mono">
                    Raw model output (CSS):
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
            <div className={`h-full ${activeTab === 'logs' ? 'block' : 'hidden'}`}>
              <LogPanel logs={logs} className="h-full" />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex-shrink-0 border-t border-border-subtle bg-page-elevated/50">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-6 text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <Cpu size={12} />
              <span>{selectedModel.backend}</span>
            </div>

            {stats && (
              <>
                <div className="flex items-center gap-2">
                  <Clock size={12} />
                  <span>{(stats.generationTimeMs / 1000).toFixed(1)}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={12} />
                  <span>~{stats.tokenCount} tokens</span>
                </div>
              </>
            )}

            {isGenerating && (
              <div className="flex items-center gap-2 text-cyan-500">
                <Loader2 size={12} className="animate-spin" />
                <span>Generating...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
