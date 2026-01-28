import { motion } from 'motion/react';
import Section from './Section';
import { siteData } from '@/lib/data';

const TechStack = () => {
  return (
    <Section id="tech-stack" className="border-y border-border-subtle bg-surface/30">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // tech stack
      </motion.span>

      <motion.h2
        id="tech-stack-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-4"
      >
        {siteData.techStack.heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted mb-10"
      >
        {siteData.techStack.subheading}
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {siteData.techStack.categories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + categoryIndex * 0.05 }}
          >
            <h3 className="text-xs font-mono font-medium text-accent uppercase tracking-wider mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span key={item} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;

