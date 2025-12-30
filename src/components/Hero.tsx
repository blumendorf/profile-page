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
      className="relative min-h-screen flex items-center justify-center gradient-mesh overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="w-36 h-36 sm:w-40 sm:h-40 mx-auto rounded-full overflow-hidden glow-accent">
                <img
                  src={`${import.meta.env.BASE_URL}marco-small.jpg`}
                  alt="Dr Marco Blumendorf"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent to-accent-secondary opacity-20 blur-md -z-10" />
            </div>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="heading-xl mb-2">
              Dr Marco Blumendorf
            </h1>
            <p className="text-xl sm:text-2xl text-accent font-mono font-medium">
              Director of Software Engineering
            </p>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <p className="text-body max-w-3xl mx-auto">
              Leading engineering teams through the AI transformation. Building AI-ready codebases.
              Enabling engineers to thrive in the new era of software development.
            </p>
          </motion.div>

          {/* Supporting context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <p className="text-muted max-w-2xl mx-auto">
              PhD in Distributed AI from TU-Berlin. 20+ years shipping software.
              Currently directing engineering at CHAPTR, building AI-powered products for the publishing industry.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <button
              onClick={handleScrollToShift}
              className="btn-ghost group"
              aria-label="Scroll to learn more"
            >
              <span>The Transformation</span>
              <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-page to-transparent" />
    </section>
  );
};

export default Hero;

