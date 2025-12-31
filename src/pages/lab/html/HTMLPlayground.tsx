import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { webllmEngine, DownloadProgress } from '../shared';
import { generateHTML, DEFAULT_HTML } from './html-generator';
import { HTMLPreview } from './HTMLPreview';
import { ArrowLeft, Code2, Sparkles, Loader2, Code, Eye } from 'lucide-react';

const SUGGESTIONS = [
  "Dark terminal hacker aesthetic",
  "Clean minimal professional look",
  "Warm friendly startup vibe",
  "Brutalist bold typography",
];

export default function HTMLPlayground() {
  const [downloadState, setDownloadState] = useState<{
    stage: 'downloading' | 'loading' | 'ready';
    progress: number;
    text: string;
  } | null>({ stage: 'downloading', progress: 0, text: 'Initializing...' });

  const [html, setHtml] = useState(DEFAULT_HTML);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [generationTime, setGenerationTime] = useState<number | null>(null);

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
    if (!intent.trim() || isGenerating || !modelReady) return;

    setIsGenerating(true);
    setError(null);
    setInput(intent);

    try {
      const startTime = Date.now();
      const generatedHtml = await generateHTML(intent);
      setGenerationTime(Date.now() - startTime);
      setHtml(generatedHtml);
    } catch (err) {
      console.error('HTML generation failed:', err);
      setError('Failed to generate HTML. Try a simpler description.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleGenerate(input);
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Download overlay */}
      {downloadState && downloadState.stage !== 'ready' && (
        <DownloadProgress {...downloadState} />
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
            <span>HTML Generator</span>
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

      {/* Input bar */}
      <div className="flex-shrink-0 bg-page/95 backdrop-blur-sm border-b border-border-subtle">
        <div className="max-w-6xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the style you want (e.g., 'Dark terminal hacker aesthetic')"
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

          {/* Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-text-muted text-sm">Try:</span>
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => void handleGenerate(suggestion)}
                disabled={!modelReady || isGenerating}
                className="text-sm px-3 py-1 rounded-full border border-border-subtle
                           hover:border-cyan-500 hover:text-cyan-500 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Stats */}
          {generationTime && (
            <div className="text-xs text-text-muted mt-2 font-mono">
              Generated in {(generationTime / 1000).toFixed(1)}s
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="max-w-6xl mx-auto px-4 py-3 w-full">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Toggle */}
        <div className="flex-shrink-0 border-b border-border-subtle">
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2">
            <button
              onClick={() => setShowCode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
                ${!showCode ? 'bg-cyan-500/20 text-cyan-500' : 'text-text-muted hover:text-text-primary'}`}
            >
              <Eye size={16} />
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors
                ${showCode ? 'bg-cyan-500/20 text-cyan-500' : 'text-text-muted hover:text-text-primary'}`}
            >
              <Code size={16} />
              Code
            </button>
          </div>
        </div>

        {/* Preview / Code */}
        <div className="flex-1 p-4 min-h-0">
          <div className="max-w-6xl mx-auto h-full">
            {showCode ? (
              <div className="h-full bg-page-elevated rounded-lg border border-border-subtle overflow-auto">
                <pre className="p-4 text-xs font-mono text-text-muted whitespace-pre-wrap">
                  {html}
                </pre>
              </div>
            ) : (
              <HTMLPreview html={html} className="h-full min-h-[500px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
