import { motion } from 'motion/react';
import { Cpu, X } from 'lucide-react';

interface DownloadProgressProps {
  stage: 'downloading' | 'loading' | 'ready';
  progress: number;
  text: string;
  /** Download size in GB (default: 0.5 for backward compatibility) */
  downloadSizeGB?: number;
  /** Optional model name to display */
  modelName?: string;
  /** Optional callback when user cancels the download */
  onCancel?: () => void;
}

export function DownloadProgress({
  stage,
  progress,
  text,
  downloadSizeGB = 0.5,
  modelName,
  onCancel,
}: DownloadProgressProps) {
  const sizeDownloaded = (progress / 100 * downloadSizeGB).toFixed(2);

  return (
    <div className="fixed inset-0 bg-page flex items-center justify-center z-50">
      <div className="max-w-md w-full p-8 text-center">
        <div className="mb-8 relative">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full border-4 border-accent/20 flex items-center justify-center"
            style={{ borderTopColor: 'var(--accent-primary)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Cpu className="w-10 h-10 text-accent" />
          </motion.div>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-text-primary">
          {stage === 'downloading' && 'Downloading AI Model'}
          {stage === 'loading' && 'Loading into GPU Memory'}
          {stage === 'ready' && 'Ready!'}
        </h2>

        {modelName && (
          <p className="text-accent text-sm mb-2 font-mono">{modelName}</p>
        )}

        <p className="text-text-muted text-sm mb-6 font-mono">{text}</p>

        {/* Progress bar */}
        <div className="h-2 bg-surface rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div className="text-text-muted text-sm font-mono">
          {stage === 'downloading' && `${sizeDownloaded} / ${downloadSizeGB} GB`}
          {stage === 'loading' && `${progress}%`}
        </div>

        <p className="text-text-muted text-xs mt-8">
          This only happens once. The model is cached in your browser.
        </p>

        {onCancel && stage === 'downloading' && (
          <button
            onClick={onCancel}
            className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 text-sm text-text-muted
                       hover:text-red-400 border border-border-subtle rounded-lg
                       hover:border-red-400/50 transition-colors"
          >
            <X size={14} />
            Cancel Download
          </button>
        )}
      </div>
    </div>
  );
}
