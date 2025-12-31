import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkCompatibility, type CompatibilityResult } from '../shared';
import { AlertTriangle, CheckCircle, Download, Zap, ArrowLeft, Settings2 } from 'lucide-react';

export default function ConfigLanding() {
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
          <div className="inline-flex items-center gap-2 text-accent font-mono text-sm mb-4">
            <Settings2 size={16} />
            <span>// experiment.config</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 mb-4">Config Generator</h1>
          <p className="text-text-muted text-lg leading-relaxed">
            AI generates a JSON configuration that adapts the profile's theme,
            colors, and content based on your intent.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-page-elevated rounded-lg p-6 mb-8 border border-border-subtle">
          <h3 className="font-mono text-sm text-accent mb-4">How it works</h3>
          <ul className="text-sm text-text-muted space-y-2">
            <li>1. You describe who you are or what you're looking for</li>
            <li>2. AI generates a JSON config (theme, colors, content variant)</li>
            <li>3. React renders the profile using that config</li>
          </ul>
          <div className="mt-4 p-3 bg-page rounded font-mono text-xs text-text-muted">
            <span className="text-cyan-500">{"{"}</span>
            {" theme: "}
            <span className="text-amber-500">"terminal"</span>
            {", accentColor: "}
            <span className="text-amber-500">"cyan"</span>
            {" "}
            <span className="text-cyan-500">{"}"}</span>
          </div>
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
          to={compat?.canRun ? "/lab/config/adaptive" : "#"}
          onClick={(e) => !compat?.canRun && e.preventDefault()}
          className={`w-full py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors
            ${compat?.canRun
              ? 'bg-accent text-bg-page hover:bg-accent/90'
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
