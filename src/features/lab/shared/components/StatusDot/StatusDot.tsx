import { cn } from '@/lib/utils';

export type LoadStatus = 'ready' | 'loading';

export interface StatusDotProps {
  status: LoadStatus;
  className?: string;
}

const label: Record<LoadStatus, { text: string; className: string }> = {
  ready: { text: '● Ready', className: 'text-emerald-500' },
  loading: { text: '● Loading...', className: 'text-amber-500' },
};

/**
 * Compact model readiness indicator in the HTML playground header.
 */
export const StatusDot = ({ status, className }: StatusDotProps) => {
  const { text, className: tone } = label[status];
  return <span className={cn('text-xs font-mono', tone, className)}>{text}</span>;
};
