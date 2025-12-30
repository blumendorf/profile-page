import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

const Section = ({ id, children, className = '', containerClassName = '' }: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`section-container ${containerClassName}`}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;

