import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type IconWellVariant = 'default' | 'contactEmail' | 'contactExternal';

const variantClass: Record<IconWellVariant, string> = {
  default: 'p-2 rounded-md bg-surface group-hover:bg-accent/10 transition-colors',
  contactEmail:
    'p-2.5 rounded-md transition-colors bg-accent/10 text-accent group-hover:bg-accent group-hover:text-page',
  contactExternal:
    'p-2.5 rounded-md transition-colors bg-surface text-text-muted group-hover:bg-accent/10 group-hover:text-accent',
};

export interface IconWellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Visual variant for icon-in-square patterns (expertise cards vs contact rows). */
  variant?: IconWellVariant;
  className?: string;
}

export const IconWell = ({
  children,
  variant = 'default',
  className,
  ...rest
}: IconWellProps) => (
  <div className={cn(variantClass[variant], className)} {...rest}>
    {children}
  </div>
);
