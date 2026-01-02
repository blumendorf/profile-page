import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FlaskConical, ArrowRight } from 'lucide-react';
import Section from './Section';

const Lab = () => {
  return (
    <Section id="lab">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // lab
      </motion.span>

      <motion.h2
        id="lab-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-6"
      >
        The Lab
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-body mb-8 max-w-2xl"
      >
        A place for experiments and writeups-things I'm tinkering with, exploring,
        or just curious about. Some ideas turn into real projects, others stay as notes
        on what I've learned along the way.
      </motion.p>

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

