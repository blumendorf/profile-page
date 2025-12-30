import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const handleScrollToShift = () => {
    const element = document.getElementById('the-shift');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Mesh - subtle movement */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-page opacity-90 z-10"></div>
        <div
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-accent/20 blur-[120px] animate-pulse-glow"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-secondary/10 blur-[120px] animate-pulse-glow"
          style={{ animationDuration: '10s', animationDelay: '1s' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-1"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <div className="relative inline-block group cursor-pointer">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-2 border-accent/20 transition-all duration-500 group-hover:border-accent/50 group-hover:scale-105 animate-float relative z-10">
                <img
                  src={`${import.meta.env.BASE_URL}marco-small.jpg`}
                  alt="Dr Marco Blumendorf"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Glow rings */}
              <div className="absolute -inset-4 rounded-full bg-accent/5 blur-xl -z-10 group-hover:bg-accent/15 transition-all duration-500" />
              <div className="absolute -inset-1 rounded-full border border-accent/10 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="heading-xl mb-4 text-balance">
              Dr Marco Blumendorf
            </h1>
            <p className="text-xl sm:text-2xl text-accent font-mono font-medium tracking-tight">
              Director of Software Engineering
            </p>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <p className="text-body max-w-2xl mx-auto text-balance">
              Leading engineering teams through the AI transformation. Building AI-ready codebases.
              Enabling engineers to thrive in the new era of software development.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex justify-center gap-4"
          >
            <button
              onClick={handleScrollToShift}
              className="btn-primary group"
              aria-label="Scroll to learn more"
            >
              <span>Explore The Shift</span>
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-xs font-mono uppercase tracking-widest opacity-60">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-muted/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
