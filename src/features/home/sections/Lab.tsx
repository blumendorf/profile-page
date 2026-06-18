import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FlaskConical, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import Section from '../components/Section';

const labIntro = (
  <p className="text-body mb-8 max-w-2xl">
    A place for experiments and writeups-things I&apos;m tinkering with, exploring,
    or just curious about. Some ideas turn into real projects, others stay as notes
    on what I&apos;ve learned along the way.
  </p>
);

const Lab = () => {
  return (
    <Section id="lab">
      <SectionHeader
        kicker="// lab"
        title="The Lab"
        titleId="lab-heading"
        titleSpacingClassName="mb-6"
        intro={labIntro}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/lab"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent text-accent hover:bg-accent hover:text-page transition-all text-sm font-medium"
        >
          <FlaskConical size={16} />
          <span>Explore the Lab</span>
          <ArrowRight size={14} />
        </Link>
      </motion.div>
    </Section>
  );
};

export default Lab;
