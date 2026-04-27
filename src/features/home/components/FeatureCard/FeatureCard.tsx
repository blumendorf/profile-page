import { type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { IconWell, ShineCard } from '@/components/ui';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

/**
 * Expertise grid card: `ShineCard` + `IconWell` + title and body.
 */
export const FeatureCard = ({ title, description, icon: Icon, index }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 + index * 0.1 }}
  >
    <ShineCard className="h-full group">
      <div className="flex items-center gap-3 mb-4">
        <IconWell>
          <Icon className="w-5 h-5 text-accent" />
        </IconWell>
      </div>
      <h3 className="heading-md mb-3">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </ShineCard>
  </motion.div>
);
