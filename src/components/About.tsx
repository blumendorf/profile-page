import { motion } from 'framer-motion';
import Section from './Section';

const focusAreas = [
  'Helping engineers develop as AI reshapes what we do',
  'Evolving codebases from legacy patterns to AI-ready architectures',
  'Building team cultures that adapt fast',
];

const About = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          id="about-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-lg mb-8"
        >
          About Me
        </motion.h2>

        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-body"
          >
            I've spent 20+ years at the intersection of AI research and software development.
            My PhD in Distributed AI at TU-Berlin gave me theoretical foundations.
            Building and scaling engineering teams at startups taught me what works in the real world.
            Now, as Director of Software Engineering at CHAPTR, I combine both—leading teams
            that build AI-powered products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-body mb-4">
              These days, I focus on what I think is the biggest challenge in engineering leadership:
              <span className="text-accent font-medium"> getting teams and codebases ready for AI-driven development</span>. That means:
            </p>

            <ul className="space-y-3 ml-1">
              {focusAreas.map((area, index) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-text-secondary text-base"
                >
                  <span className="text-accent mt-1.5">•</span>
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;

