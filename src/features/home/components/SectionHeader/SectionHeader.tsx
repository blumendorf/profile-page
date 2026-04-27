import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const inView = { once: true } as const;

export interface SectionHeaderProps {
  /** e.g. `// about` */
  kicker: string;
  title: string;
  titleId?: string;
  /**
   * Spacing class under the main heading (e.g. `mb-4`, `mb-8`, `mb-12`).
   * @default 'mb-4'
   */
  titleSpacingClassName?: string;
  /** Muted one-liner (expertise, tech stack). */
  subheading?: string;
  /**
   * Rich intro body below the title (e.g. Lab, Contact) — you control typography in children.
   */
  intro?: ReactNode;
  kickerClassName?: string;
  titleClassName?: string;
}

/**
 * Standard animated kicker + heading (+ optional subheading / intro) used in home route sections.
 */
export const SectionHeader = ({
  kicker,
  title,
  titleId,
  titleSpacingClassName = 'mb-4',
  subheading,
  intro,
  kickerClassName = 'section-label block',
  titleClassName = 'heading-lg',
}: SectionHeaderProps) => (
  <>
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={inView}
      className={kickerClassName}
    >
      {kicker}
    </motion.span>

    <motion.h2
      id={titleId}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={inView}
      transition={{ delay: 0.1 }}
      className={cn(titleClassName, titleSpacingClassName)}
    >
      {title}
    </motion.h2>

    {subheading !== undefined && subheading.length > 0 && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 0.2 }}
        className="text-muted mb-10"
      >
        {subheading}
      </motion.p>
    )}

    {intro !== undefined && intro !== null && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 0.2 }}
      >
        {intro}
      </motion.div>
    )}
  </>
);
