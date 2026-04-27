import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  footnote?: string;
  className?: string;
  /** Icon well tone, e.g. `bg-cyan-500/10` and icon `text-cyan-500` */
  iconContainerClassName?: string;
}

/**
 * Centered empty state used when no model is selected (HTML Playground) or similar.
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  footnote,
  className,
  iconContainerClassName = 'bg-cyan-500/10',
}: EmptyStateProps) => (
  <div className={cn('flex-1 flex items-center justify-center p-8', className)}>
    <div className="text-center max-w-md">
      <div
        className={cn('w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center', iconContainerClassName)}
      >
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-3">{title}</h2>
      <p className="text-text-muted mb-6">{description}</p>
      {action}
      {footnote ? <p className="text-xs text-text-muted mt-4">{footnote}</p> : null}
    </div>
  </div>
);
