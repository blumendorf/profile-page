import { type ReactNode } from 'react';
import { Clock, Cpu, Hash, Loader2, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatsBarProps {
  modelBackendLabel?: string;
  stats?: { generationTimeMs: number; tokenCount: number } | null;
  isGenerating?: boolean;
  className?: string;
}

const Row = ({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) => (
  <div className="flex items-center gap-2">
    <Icon size={12} />
    {children}
  </div>
);

/**
 * Footer status strip for HTML Playground: backend, timing, token count, generating indicator.
 */
export const StatsBar = ({
  modelBackendLabel,
  stats,
  isGenerating,
  className,
}: StatsBarProps) => (
  <div className={cn('shrink-0 border-t border-border-subtle bg-surface/50', className)}>
    <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-6 text-xs font-mono text-text-muted">
      {modelBackendLabel && (
        <Row icon={Cpu}>
          <span>{modelBackendLabel}</span>
        </Row>
      )}

      {stats && (
        <>
          <Row icon={Clock}>
            <span>{(stats.generationTimeMs / 1000).toFixed(1)}s</span>
          </Row>
          <Row icon={Hash}>
            <span>~{stats.tokenCount} tokens</span>
          </Row>
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
);
