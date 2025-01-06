import React, { useEffect, useRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
  index: number;
  totalSections: number;
  id: string;
  onInView?: () => void;
}

const Section: React.FC<SectionProps> = ({ children, id, index, totalSections, onInView }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onInView();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onInView]);

  const getGradientClass = (index: number, total: number) => {
    const position = index / (total - 1);

    if (position === 0) return 'bg-gray-100/80 dark:bg-gray-900/80';
    if (position < 0.3) return 'bg-gradient-to-b from-gray-100/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80';
    if (position < 0.6) return 'bg-white/80 dark:bg-gray-800/80';
    if (position < 0.8) return 'bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80';
    if (position < 0.9) return 'bg-gradient-to-b from-gray-100/80 to-white/80 dark:from-gray-900/80 dark:to-gray-800/80';
    return 'bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80';
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`
        py-24
        ${getGradientClass(index, totalSections)}
        transition-colors duration-300 ease-in-out
        relative
      `}
    >
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;