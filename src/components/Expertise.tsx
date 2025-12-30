import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase } from 'lucide-react';
import Section from './Section';
import SpotlightCard from './ui/SpotlightCard';

const expertiseAreas = [
  {
    icon: Cpu,
    title: 'Developer Experience',
    description: 'Ensuring the team can deliver their best work by structuring codebases for quality and AI-compatibility, integrating AI tools into daily workflows, and building development environments that scale.',
  },
  {
    icon: Users,
    title: 'Team & Culture',
    description: 'Building environments where engineers grow, adapting processes as tooling evolves, mentoring career development, and maintaining quality as velocity increases.',
  },
  {
    icon: Briefcase,
    title: 'Technical Leadership',
    description: 'Collaborating with product on roadmaps, making architecture decisions for new systems, managing delivery and timelines, and keeping technical debt under control.',
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
          <h2 className="heading-lg mb-4">Areas of Focus</h2>
          <p className="text-body max-w-2xl mx-auto">
            What I spend my time on.
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
              className="h-full"
            >
              <SpotlightCard className="h-full p-6 group">
                <div className="p-3 rounded-lg bg-accent/5 text-accent group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300 ring-1 ring-accent/10 w-fit mb-4">
                  <area.icon className="w-6 h-6" />
                </div>
                <h3 className="heading-md mb-2 text-lg">{area.title}</h3>
                <p className="text-muted">{area.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Expertise;
