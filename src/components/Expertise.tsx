import { motion } from 'framer-motion';
import { Cpu, Users, Briefcase } from 'lucide-react';
import Section from './Section';

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
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // expertise
      </motion.span>

      <motion.h2
        id="expertise-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-4"
      >
        Areas of Focus
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted mb-10"
      >
        What I spend my time on.
      </motion.p>

      <div className="grid gap-4 md:grid-cols-3">
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="card group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md bg-surface group-hover:bg-accent/10 transition-colors">
                <area.icon className="w-5 h-5 text-accent" />
              </div>
            </div>
            <h3 className="heading-md mb-3">{area.title}</h3>
            <p className="text-muted leading-relaxed">{area.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Expertise;
