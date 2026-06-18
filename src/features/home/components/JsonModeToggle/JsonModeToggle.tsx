import { cn } from '@/lib/utils';

export interface JsonModeToggleProps {
  isJsonMode: boolean;
  onClick: () => void;
  /** Wider, labeled control for the desktop bar. */
  size?: 'default' | 'compact';
  'aria-label'?: string;
  className?: string;
}

const base =
  'px-2 py-1 text-xs font-mono font-bold rounded border transition-colors focus-ring';

/**
 * Toggles the profile JSON “developer” view in the home navbar.
 */
export const JsonModeToggle = ({
  isJsonMode,
  onClick,
  size = 'default',
  'aria-label': ariaLabel,
  className,
}: JsonModeToggleProps) => {
  const active = isJsonMode
    ? 'bg-accent text-bg-page border-accent'
    : 'bg-transparent text-text-muted border-text-muted';
  const idleHover =
    size === 'default' && !isJsonMode
      ? 'hover:text-text-primary hover:border-text-primary'
      : '';
  const idleHoverWhenActive = size === 'default' && isJsonMode ? 'hover:bg-accent/90' : '';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        active,
        size === 'default' && (idleHover || idleHoverWhenActive),
        className
      )}
      aria-label={ariaLabel ?? (isJsonMode ? 'Switch to Human view' : 'Switch to JSON view')}
    >
      {isJsonMode ? '{JSON}' : 'JSON'}
    </button>
  );
};
