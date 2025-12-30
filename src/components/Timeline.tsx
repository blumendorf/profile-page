import { motion } from 'framer-motion';
import { GraduationCap, Rocket, Briefcase, Sparkles, Heart } from 'lucide-react';
import Section from './Section';

type TimelinePhase = {
  icon: typeof GraduationCap;
  period: string;
  title: string;
  description: string;
};

const phases: TimelinePhase[] = [
  {
    icon: GraduationCap,
    period: '1999–2010',
    title: 'Academic Foundations',
    description:
      'Research and PhD at TU-Berlin\'s Distributed AI Lab. Led the Human-Computer Interaction workgroup. Advised 13 PhD students. Published thesis on multimodal interaction in smart environments.',
  },
  {
    icon: Rocket,
    period: '2010–2017',
    title: 'Startup Building',
    description:
      'Built engineering teams from scratch. Scaled yetu AG\'s smart home development from 2 to 18 engineers. Led smartB as CTO—raised funding, built IoT platform for commercial energy management.',
  },
  {
    icon: Briefcase,
    period: '2017–2023',
    title: 'Independent Practice',
    description:
      'Freelance CTO and consultant. Led engineering for multiple startups. Technical leadership, React coaching, and strategic advisory across sustainability and IoT sectors.',
  },
  {
    icon: Sparkles,
    period: '2023–Present',
    title: 'CHAPTR — AI in Publishing',
    description:
      'Senior Engineer → Director of Software Engineering. Building AI-powered products for the publishing industry. Leading teams through the AI transformation in practice.',
  },
  {
    icon: Heart,
    period: 'Ongoing',
    title: 'Non-Profit Engagement',
    description:
      'Co-founder and Vice President of GreenBuzz Berlin. Building networks for sustainability professionals. Technology in service of impact.',
  },
];

const Timeline = () => {
  return (
    <Section id="journey" className="bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          id="journey-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-lg mb-12 text-center"
        >
          Professional Journey
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-px" />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start gap-6 pb-12 last:pb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Connector dot */}
              <div
                className={`absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-accent border-4 border-page md:-translate-x-1.5 z-10`}
              />

              {/* Content */}
              <div
                className={`ml-8 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <div
                  className={`inline-flex items-center gap-2 mb-2 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <phase.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-mono text-text-muted">{phase.period}</span>
                </div>
                <h3 className="heading-md mb-2">{phase.title}</h3>
                <p className="text-text-secondary">{phase.description}</p>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Timeline;

