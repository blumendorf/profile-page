/**
 * Warning banner displayed when another tab is using a model.
 */
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, Loader2, Cpu, Zap } from 'lucide-react';
import type { OtherTabInfo } from '../hooks/useCrossTabModel';

interface CrossTabWarningProps {
  otherTab: OtherTabInfo;
  onDismiss: () => void;
  dismissed: boolean;
}

const statusMessages: Record<OtherTabInfo['status'], string> = {
  idle: 'is idle',
  loading: 'is loading',
  ready: 'has a model loaded',
  generating: 'is generating',
  error: 'encountered an error',
};

const statusIcons: Record<OtherTabInfo['status'], React.ReactNode> = {
  idle: <Cpu className="w-4 h-4" />,
  loading: <Loader2 className="w-4 h-4 animate-spin" />,
  ready: <Cpu className="w-4 h-4" />,
  generating: <Zap className="w-4 h-4" />,
  error: <AlertTriangle className="w-4 h-4" />,
};

export function CrossTabWarning({ otherTab, onDismiss, dismissed }: CrossTabWarningProps) {
  // Display the model ID directly - each experiment manages its own model names
  const modelName = otherTab.modelId || 'Unknown';

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-lg overflow-hidden"
        >
          <div className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-amber-500 text-sm mb-1">
                Model in Use by Another Tab
              </h4>
              <p className="text-text-muted text-sm">
                Another browser tab {statusMessages[otherTab.status]} (
                <span className="font-mono text-xs inline-flex items-center gap-1">
                  {statusIcons[otherTab.status]}
                  {modelName}
                </span>
                ). Running multiple models simultaneously may cause GPU memory issues or slow performance.
              </p>
              <p className="text-text-muted text-xs mt-2 opacity-75">
                Consider closing other tabs or waiting for generation to complete.
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 rounded-sm hover:bg-amber-500/20 text-amber-500 transition-colors"
              aria-label="Dismiss warning"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Compact inline warning (for use in headers/toolbars)
 */
interface CrossTabIndicatorProps {
  otherTab: OtherTabInfo | null;
  className?: string;
}

export function CrossTabIndicator({ otherTab, className = '' }: CrossTabIndicatorProps) {
  if (!otherTab) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs ${className}`}
      title={`Another tab ${statusMessages[otherTab.status]}`}
    >
      {statusIcons[otherTab.status]}
      <span className="hidden sm:inline">Other tab active</span>
    </motion.div>
  );
}

