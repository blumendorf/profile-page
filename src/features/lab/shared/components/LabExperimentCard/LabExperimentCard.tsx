import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LabPill } from '../LabPill';
import { cn } from '@/lib/utils';

export interface LabExperimentCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  accentColor: string;
  tag?: string;
  isExternal?: boolean;
}

const cardClass =
  'block p-6 rounded-lg border border-border-subtle hover:border-current bg-transparent transition-all group';

/**
 * Card linking to a Lab route or an external resource (e.g. Storybook).
 */
export const LabExperimentCard = ({
  title,
  description,
  icon,
  href,
  accentColor,
  tag,
  isExternal,
}: LabExperimentCardProps) => {
  const content = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg', accentColor)}>{icon}</div>
        {tag ? <LabPill>{tag}</LabPill> : null}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed mb-4">{description}</p>

      <div className="flex items-center gap-2 text-sm font-medium text-accent">
        <span>View</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </>
  );

  if (isExternal) {
    const opensNewTab = href.startsWith('http');

    return (
      <a
        href={href}
        className={cardClass}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={cardClass}>
      {content}
    </Link>
  );
};
