import { motion } from 'motion/react';
import { ReactNode } from 'react';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

const Section = ({ id, children, className = '', wide = false }: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={wide ? 'section-container-wide' : 'section-container'}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;

