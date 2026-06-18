import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SeriesPartMeta } from '../parts';
import { cn } from '@/lib/utils';

export interface SeriesNavProps {
  previous?: SeriesPartMeta;
  next?: SeriesPartMeta;
  /** Where the "back to lab" fallback should point (used when there's no previous part). */
  labIndexPath?: string;
  /** Card-sized prev/next pair (footer). When false, renders a compact strip. */
  variant?: 'compact' | 'cards';
  className?: string;
  totalParts: number;
  currentPart: number;
}

const labFallback = {
  shortTitle: 'Back to the Lab',
  description: '',
};

export const SeriesNav = ({
  previous,
  next,
  labIndexPath = '/lab',
  variant = 'compact',
  className,
  totalParts,
  currentPart,
}: SeriesNavProps) => {
  const isFirst = currentPart === 1;
  const isLast = currentPart === totalParts;

  const previousTarget = previous
    ? { to: previous.path, label: `Part ${previous.partNumber}`, title: previous.shortTitle, description: previous.description }
    : { to: labIndexPath, label: 'Lab', title: labFallback.shortTitle, description: labFallback.description };

  const nextTarget = next
    ? { to: next.path, label: `Part ${next.partNumber}`, title: next.shortTitle, description: next.description }
    : isLast
      ? { to: labIndexPath, label: 'Lab', title: 'Done. Back to the Lab.', description: '' }
      : null;

  if (variant === 'compact') {
    return (
      <nav
        aria-label="Series navigation"
        className={cn(
          'flex items-center justify-between gap-4 text-xs sm:text-sm',
          className,
        )}
      >
        <Link
          to={previousTarget.to}
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors min-w-0"
        >
          <ArrowLeft size={14} aria-hidden className="shrink-0" />
          <span className="flex flex-col items-start min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
              {isFirst ? 'Back' : 'Previous'}
            </span>
            <span className="truncate max-w-[10rem] sm:max-w-[14rem]">
              {previousTarget.title}
            </span>
          </span>
        </Link>

        {nextTarget ? (
          <Link
            to={nextTarget.to}
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors min-w-0 text-right"
          >
            <span className="flex flex-col items-end min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                {isLast ? 'Series end' : 'Next'}
              </span>
              <span className="truncate max-w-[10rem] sm:max-w-[14rem]">
                {nextTarget.title}
              </span>
            </span>
            <ArrowRight size={14} aria-hidden className="shrink-0" />
          </Link>
        ) : (
          <span className="text-text-muted/40 text-xs">—</span>
        )}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Series navigation"
      className={cn('grid gap-4 sm:grid-cols-2', className)}
    >
      <Link
        to={previousTarget.to}
        className="group block rounded-lg border border-border-subtle bg-surface/40 p-5 transition-colors hover:border-accent/50"
      >
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
          <ArrowLeft size={14} aria-hidden />
          <span>{isFirst ? 'Back to' : `Part ${previous?.partNumber ?? ''}`}</span>
        </div>
        <h3 className="text-base font-medium text-text-primary group-hover:text-accent transition-colors mb-1">
          {previousTarget.title}
        </h3>
        {previousTarget.description ? (
          <p className="text-sm text-text-muted leading-relaxed">{previousTarget.description}</p>
        ) : null}
      </Link>

      {nextTarget ? (
        <Link
          to={nextTarget.to}
          className="group block rounded-lg border border-border-subtle bg-surface/40 p-5 transition-colors hover:border-accent/50 sm:text-right"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted mb-2 sm:justify-end">
            <span>{isLast ? 'Series end' : `Part ${next?.partNumber ?? ''}`}</span>
            <ArrowRight size={14} aria-hidden />
          </div>
          <h3 className="text-base font-medium text-text-primary group-hover:text-accent transition-colors mb-1">
            {nextTarget.title}
          </h3>
          {nextTarget.description ? (
            <p className="text-sm text-text-muted leading-relaxed">{nextTarget.description}</p>
          ) : null}
        </Link>
      ) : (
        <div aria-hidden />
      )}
    </nav>
  );
};
