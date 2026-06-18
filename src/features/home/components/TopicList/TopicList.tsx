import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

export interface TopicListProps {
  topics: readonly string[];
  /** Shown next to the icon. */
  heading?: string;
}

/**
 * “Things I like talking about” block with a left border list.
 */
export const TopicList = ({
  topics,
  heading = 'Things I like talking about',
}: TopicListProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="mb-8"
  >
    <div className="flex items-center gap-2 mb-4">
      <MessageSquare size={16} className="text-accent" />
      <span className="text-sm font-mono text-text-muted">{heading}</span>
    </div>
    <ul className="space-y-2">
      {topics.map((topic, index) => (
        <motion.li
          key={topic}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 + index * 0.05 }}
          className="text-sm text-text-secondary pl-4 border-l-2 border-border-subtle hover:border-accent transition-colors"
        >
          {topic}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);
