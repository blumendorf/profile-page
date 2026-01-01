import { motion } from 'framer-motion';
import Section from './Section';
import { siteData } from '@/lib/data';

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
        {siteData.journey.heading}
      </motion.h2>

      <div className="relative ml-6">
        {/* Timeline line */}
        <div className="timeline-line" />

        {siteData.journey.phases.map((phase, index) => (
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

