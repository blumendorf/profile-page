interface SectionProps {
  children: React.ReactNode;
  index: number;
  totalSections: number;
  id: string;
}

const Section: React.FC<SectionProps> = ({ children, id, index, totalSections }) => {
  const getGradientClass = (index: number, total: number) => {
    const position = index / (total - 1);

    if (position === 0) return 'bg-gray-100 dark:bg-gray-900';
    if (position < 0.3) return 'bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800';
    if (position < 0.6) return 'bg-white dark:bg-gray-800';
    if (position < 0.8) return 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900';
    if (position < 0.9) return 'bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800';
    return 'bg-gradient-to-b from-white to-gray-100 dark:from-gray-800 dark:to-gray-900';
  };

  return (
    <section
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