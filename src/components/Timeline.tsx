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
      'PhD at TU-Berlin\'s DAI-Labor, researching adaptive user interfaces across devices and modalities—voice, touch, gestures, smart environments. Led the Human-Computer Interaction workgroup. Advised PhD students. What we worked on then is now called generative UI.',
  },
  {
    icon: Rocket,
    period: '2010–2017',
    title: 'Startup Building',
    description:
      'Built engineering teams from scratch. Scaled yetu AG\'s smart home development. Led smartB as CTO—raised funding, built an IoT platform for commercial energy management.',
  },
  {
    icon: Briefcase,
    period: '2017–2023',
    title: 'Independent Practice',
    description:
      'Freelance CTO and consultant. Led engineering for startups in sustainability and IoT. Technical leadership, React coaching, strategic advisory. Lots of greenfield projects.',
  },
  {
    icon: Heart,
    period: '2014–2025',
    title: 'GreenBuzz Berlin',
    description:
      'Co-founded as Sustainability Drinks at yetu in 2014. Became GreenBuzz Berlin in 2015, part of a global network for sustainability professionals.',
  },
  {
    icon: Sparkles,
    period: '2023–Present',
    title: 'CHAPTR — AI in Publishing',
    description:
      'Senior Engineer → Director of Software Engineering. CHAPTR is the AI strategy of Holtzbrinck Publishing Group. I lead the team building reedy.ai—AI-powered metadata optimization, discoverability, and semantic search for publishers.',
  },
];

const Timeline = () => {
  return (
    <Section id="journey">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">Professional Journey</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line with gradient */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-gradient-to-b from-transparent via-border-active to-transparent" />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start gap-8 pb-16 last:pb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Connector dot */}
              <div
                className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-page border-2 border-accent md:-translate-x-2 z-10 shadow-[0_0_10px_rgba(6,182,212,0.5)]`}
              >
                <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"></div>
              </div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}
              >
                <div
                  className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-surface/50 border border-border-subtle w-fit ${
                    index % 2 === 0 ? 'md:ml-auto md:flex-row-reverse' : ''
                  }`}
                >
                  <phase.icon className="w-4 h-4 text-accent" />
                  <span className="text-xs font-mono font-medium text-text-secondary">{phase.period}</span>
                </div>

                <h3 className="heading-md mb-3 text-lg">{phase.title}</h3>
                <p className="text-body text-base leading-relaxed">{phase.description}</p>
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
