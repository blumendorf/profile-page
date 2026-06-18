import { motion } from 'motion/react';

/**
 * Minimal page loader for Suspense fallback during lazy loading.
 * Uses the same design language as DownloadProgress but simpler.
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-page flex items-center justify-center">
      <motion.div
        className="w-12 h-12 rounded-full border-4 border-accent/20"
        style={{ borderTopColor: 'var(--accent-primary)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
