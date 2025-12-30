import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase } from 'lucide-react';
import Section from './Section';

const expertiseAreas = [
  {
    icon: Cpu,
    title: 'AI-Ready Engineering',
    items: [
      'Codebase architecture that AI tools can understand and extend',
      'Development workflows optimized for human-AI collaboration',
      'Quality and review processes for AI-assisted development',
      'Measuring and improving AI-augmented productivity',
    ],
  },
  {
    icon: Users,
    title: 'Engineering Team Development',
    items: [
      'Growing engineers who thrive alongside AI tools',
      'Building learning cultures that adapt to rapid change',
      'Career pathing in the age of AI-assisted development',
      'Maintaining craft and quality as tooling evolves',
    ],
  },
  {
    icon: Briefcase,
    title: 'Technical Leadership',
    items: [
      'Scaling engineering organizations through transformation',
      'Greenfield architecture with AI-readiness built in',
      'Research-to-production AI implementation',
      'Building high-performing remote engineering teams',
    ],
  },
];

const Expertise = () => {
  return (
    <Section id="expertise" className="bg-card/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          id="expertise-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-lg mb-4 text-center"
        >
          Expertise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-body text-center max-w-2xl mx-auto mb-12"
        >
          Areas of Focus
        </motion.p>

        <div className="grid gap-6 md:grid-cols-3">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="card group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                  <area.icon className="w-6 h-6" />
                </div>
                <h3 className="heading-md text-lg">{area.title}</h3>
              </div>

              <ul className="space-y-3">
                {area.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + itemIndex * 0.05 }}
                    className="flex items-start gap-2 text-text-secondary text-sm"
                  >
                    <span className="text-accent/60 mt-1">—</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Expertise;

