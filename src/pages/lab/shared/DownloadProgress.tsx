import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface DownloadProgressProps {
  stage: 'downloading' | 'loading' | 'ready';
  progress: number;
  text: string;
}

export function DownloadProgress({ stage, progress, text }: DownloadProgressProps) {
  const sizeDownloaded = (progress / 100 * 0.5).toFixed(2);

  return (
    <div className="fixed inset-0 bg-page/98 backdrop-blur-sm flex items-center justify-center z-50">
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

        <p className="text-text-muted text-sm mb-6 font-mono">{text}</p>

        {/* Progress bar */}
        <div className="h-2 bg-page-elevated rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        <div className="text-text-muted text-sm font-mono">
          {stage === 'downloading' && `${sizeDownloaded} / 0.5 GB`}
          {stage === 'loading' && `${progress}%`}
        </div>

        <p className="text-text-muted text-xs mt-8">
          This only happens once. The model is cached in your browser.
        </p>
      </div>
    </div>
  );
}

