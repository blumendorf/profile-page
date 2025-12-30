import { motion } from 'framer-motion';
import Section from './Section';

type TimelinePhase = {
  period: string;
  title: string;
  description: string;
  isCurrent?: boolean;
};

const phases: TimelinePhase[] = [
  {
    period: '2023–Present',
    title: 'CHAPTR — AI in Publishing',
    description:
      'Senior Engineer → Director of Software Engineering. CHAPTR is the AI strategy of Holtzbrinck Publishing Group. I lead the team building reedy.ai—AI-powered metadata optimization, discoverability, and semantic search for publishers.',
    isCurrent: true,
  },
  {
    period: '2014–2025',
    title: 'GreenBuzz Berlin',
    description:
      'Co-founded as Sustainability Drinks at yetu in 2014. Became GreenBuzz Berlin in 2015, part of a global network for sustainability professionals.',
  },
  {
    period: '2017–2023',
    title: 'Independent Practice',
    description:
      'Freelance CTO and consultant. Led engineering for startups in sustainability and IoT. Technical leadership, React coaching, strategic advisory. Lots of greenfield projects.',
  },
  {
    period: '2010–2017',
    title: 'Startup Building',
    description:
      'Built engineering teams from scratch. Scaled yetu AG\'s smart home development. Led smartB as CTO—raised funding, built an IoT platform for commercial energy management.',
  },
  {
    period: '1999–2010',
    title: 'Academic Foundations',
    description:
      'PhD at TU-Berlin\'s DAI-Labor, researching adaptive user interfaces across devices and modalities—voice, touch, gestures, smart environments. Led the Human-Computer Interaction workgroup. What we worked on then is now called generative UI.',
  },
];

const Timeline = () => {
  return (
    <Section id="journey">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // journey
      </motion.span>

      <motion.h2
        id="journey-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-12"
      >
        Professional Journey
      </motion.h2>

      <div className="relative ml-6">
        {/* Timeline line */}
        <div className="timeline-line" />

        {phases.map((phase, index) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative pb-12 last:pb-0"
          >
            {/* Timeline dot */}
            <div className={`timeline-dot top-1.5 ${phase.isCurrent ? 'timeline-dot-active' : ''}`} />

            {/* Content */}
            <div>
              <span className="text-xs font-mono text-accent">
                {phase.period}
              </span>
              <h3 className="heading-md mt-1 mb-2">{phase.title}</h3>
              <p className="text-muted leading-relaxed">{phase.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Timeline;
