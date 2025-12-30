import { motion } from 'framer-motion';
import Section from './Section';

const focusAreas = [
  'Facilitating the personal development of engineers as AI reshapes their craft',
  'Evolving codebases from legacy patterns to AI-ready architectures',
  'Building team cultures that embrace continuous adaptation',
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
            I've spent 20+ years at the intersection of AI research and hands-on software development.
            My PhD in Distributed Artificial Intelligence at TU-Berlin gave me deep foundations.
            Building and scaling engineering teams at startups taught me what actually ships.
            Now, as Director of Software Engineering at CHAPTR, I apply both to leading teams
            building AI-powered products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-body mb-4">
              My focus has shifted to what I believe is the most important challenge in engineering
              leadership today: <span className="text-accent font-medium">preparing teams and codebases
              for AI-driven development</span>. This means:
            </p>

            <ul className="space-y-3 ml-1">
              {focusAreas.map((area, index) => (
                <motion.li
                  key={area}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="text-accent mt-1.5">•</span>
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-body"
          >
            I've led teams through major transitions before—from monoliths to microservices,
            from on-prem to cloud, from waterfall to agile. The AI transformation is bigger
            than all of them combined. But the principles remain: start with people,
            iterate relentlessly, and never stop shipping.
          </motion.p>
        </div>
      </div>
    </Section>
  );
};

export default About;

