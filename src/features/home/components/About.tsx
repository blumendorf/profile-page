import { motion } from 'motion/react';
import { Code, Users, TestTube, LucideIcon } from 'lucide-react';
import Section from './Section';
import ShineCard from '@/components/ui/ShineCard';
import { siteData } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Users,
  TestTube,
};

const About = () => {
  return (
    <Section id="about">
      <div className="space-y-12">
        {/* About Me - Main Section */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label block"
          >
            // about
          </motion.span>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="about-heading"
            className="heading-lg mb-8"
          >
            {siteData.about.heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {siteData.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="quote text-body"
        >
          {siteData.about.quote}
        </motion.blockquote>

        {/* Pillars - What I Focus On */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {siteData.about.pillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Code;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <ShineCard className="h-full group">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                      <h3 className="font-mono text-sm font-medium text-text-primary">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </ShineCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
