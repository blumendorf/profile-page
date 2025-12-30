import { motion } from 'framer-motion';
import { Cpu, Users, GitBranch } from 'lucide-react';
import Section from './Section';
import SpotlightCard from './ui/SpotlightCard';

const pillars = [
  {
    icon: Cpu,
    title: 'Codebases that AI can reason about',
    description: 'Clean architecture, clear patterns, comprehensive context',
  },
  {
    icon: Users,
    title: 'Engineers who leverage AI as a multiplier',
    description: 'Not replaced by AI, but amplified by it',
  },
  {
    icon: GitBranch,
    title: 'Development workflows designed for human-AI collaboration',
    description: 'Review processes, quality gates, and feedback loops that work with AI in the loop',
  },
];

const TheShift = () => {
  return (
    <Section id="the-shift" className="bg-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="the-shift-heading" className="heading-lg mb-6">
            The Engineering Profession Is Changing
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-body">
            The way we build software is fundamentally transforming. AI-assisted development has
            moved from novelty to necessity. Engineers who master these tools multiply their impact.
            Teams that don't adapt fall behind—not gradually, but rapidly.
          </p>

          <p className="text-body">
            But this isn't just about adopting new tools. It requires rethinking how we structure
            code, how we architect systems, and how we develop engineering talent. AI-ready means:
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6">
                <pillar.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="heading-md mb-2 text-lg">{pillar.title}</h3>
                <p className="text-muted">{pillar.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <p className="text-body border-l-2 border-accent pl-6 italic">
            I help engineering organizations navigate this transition—not with hype,
            but with practical, battle-tested approaches.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default TheShift;
