import { motion } from 'motion/react';
import Section from './Section';
import { siteData } from '@/lib/data';

const About = () => {
  return (
    <Section id="about">
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
    </Section>
  );
};

export default About;
