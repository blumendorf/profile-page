import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase, LucideIcon } from 'lucide-react';
import Section from './Section';
import ShineCard from './ui/ShineCard';
import { siteData } from '../data/siteData';

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Users,
  Briefcase,
};

const Expertise = () => {
  return (
    <Section id="expertise">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // expertise
      </motion.span>

      <motion.h2
        id="expertise-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-4"
      >
        {siteData.expertise.heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted mb-10"
      >
        {siteData.expertise.subheading}
      </motion.p>

      <div className="grid gap-4 md:grid-cols-3">
        {siteData.expertise.areas.map((area, index) => {
          const Icon = iconMap[area.icon] || Cpu;
          return (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <ShineCard className="h-full group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-surface group-hover:bg-accent/10 transition-colors">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <h3 className="heading-md mb-3">{area.title}</h3>
                <p className="text-muted leading-relaxed">{area.description}</p>
              </ShineCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};

export default Expertise;
