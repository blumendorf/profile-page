import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase } from 'lucide-react';
import Section from './Section';
import SpotlightCard from './ui/SpotlightCard';

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
    <Section id="expertise">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Expertise</h2>
          <p className="text-body max-w-2xl mx-auto">
            My focus is on three interconnected pillars that drive engineering success in the modern era.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-lg bg-accent/5 text-accent group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300 ring-1 ring-accent/10">
                    <area.icon className="w-6 h-6" />
                  </div>
                  <h3 className="heading-md text-lg">{area.title}</h3>
                </div>

                <ul className="space-y-4">
                  {area.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-secondary text-sm group/item"
                    >
                      <span className="text-accent/40 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 group-hover/item:bg-accent group-hover/item:scale-125 transition-all" />
                      <span className="group-hover/item:text-text-primary transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Expertise;
