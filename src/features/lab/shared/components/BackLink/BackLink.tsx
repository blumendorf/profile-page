import { type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const base = 'items-center gap-2 text-text-muted transition-colors text-sm font-normal';

export interface BackLinkProps
  extends Omit<LinkProps, 'to' | 'children' | 'className'> {
  to?: string;
  /** Visible label, e.g. `Back to lab` (copy varies slightly across screens). */
  children?: ReactNode;
  className?: string;
  /**
   * Hover text color. HTML playground uses a cyan-tinted hover to match the page theme.
   * @default 'hover:text-accent'
   */
  hoverAccentClassName?: string;
  /** `flex` (default) is used in the HTML header bar; other pages use `inline-flex`. */
  display?: 'flex' | 'inline-flex';
}

/**
 * Standard “return to the Lab index” control used across Lab experiments.
 */
export const BackLink = ({
  to = '/lab',
  children = 'Back to Lab',
  className,
  hoverAccentClassName = 'hover:text-accent',
  display = 'inline-flex',
  ...rest
}: BackLinkProps) => (
  <Link
    to={to}
    className={cn(display, base, hoverAccentClassName, className)}
    {...rest}
  >
    <ArrowLeft size={16} aria-hidden />
    <span>{children}</span>
  </Link>
);
