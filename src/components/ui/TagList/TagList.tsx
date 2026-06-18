import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TagListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Layout wrapper for a row of `Badge` or other tag elements.
 */
export const TagList = ({ children, className, ...rest }: TagListProps) => (
  <div className={cn('flex flex-wrap gap-2', className)} {...rest}>
    {children}
  </div>
);
