import { motion } from 'motion/react';
import { Badge, TagList } from '@/components/ui';
import { SectionHeader } from '../components/SectionHeader';
import Section from '../components/Section';
import { siteData } from '@/lib/data';

const TechStack = () => {
  return (
    <Section id="tech-stack" className="border-y border-border-subtle bg-surface/30">
      <SectionHeader
        kicker="// tech stack"
        title={siteData.techStack.heading}
        titleId="tech-stack-heading"
        subheading={siteData.techStack.subheading}
      />

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
            <TagList>
              {category.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </TagList>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;
