import { motion } from 'motion/react';

export interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  isCurrent?: boolean;
  index: number;
}

/**
 * One row in the journey timeline (line + dot + text).
 */
export const TimelineItem = ({
  title,
  period,
  description,
  isCurrent = false,
  index,
}: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 + index * 0.1 }}
    className="relative pb-12 last:pb-0"
  >
    <div
      className={`timeline-dot top-1.5 ${isCurrent ? 'timeline-dot-active' : ''}`}
    />

    <div>
      <span className="text-xs font-mono text-accent">{period}</span>
      <h3 className="heading-md mt-1 mb-2">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </div>
  </motion.div>
);
