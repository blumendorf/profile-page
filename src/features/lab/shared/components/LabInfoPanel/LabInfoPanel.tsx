import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface LabInfoPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Muted “tip / help” well used under Lab settings and forms.
 */
export const LabInfoPanel = ({ children, className }: LabInfoPanelProps) => (
  <div className={cn('p-3 bg-page rounded-lg border border-border-subtle text-xs text-text-muted', className)}>
    {children}
  </div>
);
