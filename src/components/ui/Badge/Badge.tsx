import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Small mono pill using the shared `badge` utility from `index.css`.
 */
export const Badge = ({ children, className, ...rest }: BadgeProps) => (
  <span className={cn('badge', className)} {...rest}>
    {children}
  </span>
);
