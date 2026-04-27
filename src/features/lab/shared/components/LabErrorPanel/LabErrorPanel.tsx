import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface LabErrorPanelProps {
  message: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Inline destructive feedback strip (e.g. model or generation errors).
 */
export const LabErrorPanel = ({ message, className, children }: LabErrorPanelProps) => (
  <div className={cn('w-full', className)}>
    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
      <p className="text-red-400 text-sm mb-3">{message}</p>
      {children}
    </div>
  </div>
);
