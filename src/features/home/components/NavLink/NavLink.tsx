import { type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

export interface HomeNavLinkProps {
  href: string;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  isActive: boolean;
  children: ReactNode;
  /** Desktop inline vs mobile list row. */
  variant: 'desktop' | 'mobile';
}

const variantClass: Record<HomeNavLinkProps['variant'], string> = {
  desktop:
    'px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors rounded-none',
  mobile: 'block px-3 py-2.5 text-base font-medium rounded-md transition-colors',
};

/**
 * Home `Navbar` anchor with shared active styles for desktop and mobile.
 */
export const HomeNavLink = ({ href, onClick, isActive, children, variant }: HomeNavLinkProps) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      variantClass[variant],
      isActive
        ? variant === 'mobile'
          ? 'text-accent bg-surface/50'
          : 'text-accent'
        : 'text-text-muted hover:text-text-primary',
      variant === 'mobile' && !isActive && 'hover:bg-surface'
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    {children}
  </a>
);
