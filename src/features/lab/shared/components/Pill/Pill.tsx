import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * Small mono tag used in Lab cards and section headers.
 */
export const Pill = ({ children, className, ...rest }: PillProps) => (
  <span
    className={cn('text-xs font-mono text-text-muted bg-page px-2 py-1 rounded-sm', className)}
    {...rest}
  >
    {children}
  </span>
);
