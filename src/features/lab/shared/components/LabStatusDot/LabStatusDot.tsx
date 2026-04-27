import { cn } from '@/lib/utils';

export type LabLoadStatus = 'ready' | 'loading';

export interface LabStatusDotProps {
  status: LabLoadStatus;
  className?: string;
}

const label: Record<LabLoadStatus, { text: string; className: string }> = {
  ready: { text: '● Ready', className: 'text-emerald-500' },
  loading: { text: '● Loading...', className: 'text-amber-500' },
};

/**
 * Compact model readiness indicator in the HTML playground header.
 */
export const LabStatusDot = ({ status, className }: LabStatusDotProps) => {
  const { text, className: tone } = label[status];
  return <span className={cn('text-xs font-mono', tone, className)}>{text}</span>;
};
