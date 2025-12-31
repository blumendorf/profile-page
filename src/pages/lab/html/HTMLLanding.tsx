import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkCompatibility, type CompatibilityResult } from '../shared';
import { AlertTriangle, CheckCircle, Download, Zap, ArrowLeft, Code2 } from 'lucide-react';

export default function HTMLLanding() {
  const [compat, setCompat] = useState<CompatibilityResult | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkCompatibility().then((result) => {
      setCompat(result);
      setChecking(false);
    });
  }, []);

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
          <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-sm mb-4">
            <Code2 size={16} />
            <span>// experiment.html</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 mb-4">HTML Generator</h1>
          <p className="text-text-muted text-lg leading-relaxed">
            AI generates a complete HTML/CSS/JS profile page that renders
            live in your browser. No React—just raw web code.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-page-elevated rounded-lg p-6 mb-8 border border-border-subtle">
          <h3 className="font-mono text-sm text-cyan-500 mb-4">How it works</h3>
          <ul className="text-sm text-text-muted space-y-2">
            <li>1. You describe who you are or what style you want</li>
            <li>2. AI generates a complete HTML document with inline CSS & JS</li>
            <li>3. The code renders live in a sandboxed iframe</li>
          </ul>
          <div className="mt-4 p-3 bg-page rounded font-mono text-xs text-text-muted overflow-x-auto">
            <span className="text-cyan-500">{"<"}</span>
            <span className="text-rose-400">html</span>
            <span className="text-cyan-500">{">"}</span>
            <span className="text-text-muted">...</span>
            <span className="text-cyan-500">{"</"}</span>
            <span className="text-rose-400">html</span>
            <span className="text-cyan-500">{">"}</span>
          </div>
        </div>

        {/* Difference from Config experiment */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-cyan-500 mb-2">What's different?</h3>
          <p className="text-sm text-text-muted">
            The <strong>Config Generator</strong> creates JSON that React interprets.
            This experiment generates <strong>actual HTML/CSS/JS code</strong> that
            runs directly—the model writes the UI itself, not a config for it.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Download className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-amber-500 mb-2">Model Download Required</h3>
              <ul className="text-sm text-text-muted space-y-1">
                <li>• <strong>~500 MB</strong> model download (cached after first load)</li>
                <li>• Requires <strong>WebGPU</strong> (Chrome 113+, Edge 113+, Safari 18+)</li>
                <li>• Needs <strong>4GB+ available memory</strong></li>
                <li>• Generation may take longer (more output tokens)</li>
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

              {compat.estimatedMemory && (
                <div className="flex items-center gap-3">
                  {compat.estimatedMemory >= 4 ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  )}
                  <span className="text-text-primary">
                    Memory: ~{compat.estimatedMemory}GB available
                  </span>
                </div>
              )}

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
          to={compat?.canRun ? "/lab/html/playground" : "#"}
          onClick={(e) => !compat?.canRun && e.preventDefault()}
          className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors
            ${compat?.canRun
              ? 'bg-cyan-500 text-bg-page hover:bg-cyan-400'
              : 'bg-text-muted/20 text-text-muted cursor-not-allowed'
            }`}
        >
          <Zap className="w-5 h-5" />
          Start Experiment
        </Link>
      </div>
    </div>
  );
}
