import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl mx-auto py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0"
          >
            {/* Animated ring - the fancy highlight */}
            <div className="absolute -inset-3 rounded-full">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, var(--accent-primary), transparent)',
                  animationDuration: '8s',
                }}
              />
              <div className="absolute inset-[2px] rounded-full bg-page" />
            </div>

            {/* Image container */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-border-subtle">
              <img
                src={`${import.meta.env.BASE_URL}marco-small.jpg`}
                alt="Dr Marco Blumendorf"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
              Dr Marco Blumendorf
            </h1>

            <p className="text-xl sm:text-2xl text-accent font-mono font-medium mb-6">
              Director of Software Engineering
            </p>

            <p className="text-body max-w-lg mb-8 text-balance">
              I spent a decade at TU Berlin researching adaptive UI and distributed AI.
              Now I lead engineering teams, rethinking how we build software alongside AI.
            </p>

            {/* Quick info tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              <span className="badge">Engineering</span>
              <span className="badge">Leadership</span>
              <span className="badge">AI first</span>
            </div>

            <button
              onClick={handleScrollToAbout}
              className="btn-primary"
              aria-label="Scroll to learn more"
            >
              <span>Learn more</span>
              <ArrowDown size={18} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <div className="w-px h-12 bg-gradient-to-b from-border-active to-transparent" />
      </motion.div>

      {/* Subtle gradient accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, var(--border-subtle), transparent)'
        }}
      />
    </section>
  );
};

export default Hero;
