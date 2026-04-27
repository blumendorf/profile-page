import { motion } from 'motion/react';
import { SectionHeader } from '../components/SectionHeader';
import Section from '../components/Section';
import { siteData } from '@/lib/data';

const About = () => {
  return (
    <Section id="about">
      <div>
        <SectionHeader
          kicker="// about"
          title={siteData.about.heading}
          titleId="about-heading"
          titleSpacingClassName="mb-8"
        />

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
    </Section>
  );
};

export default About;
