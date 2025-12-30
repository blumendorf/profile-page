import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { siteData } from '../data/siteData';

const Hero = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [baseAngle, setBaseAngle] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const currentAngleRef = useRef(0);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!ringRef.current) return;

    const rect = ringRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angleRadians = Math.atan2(deltaY, deltaX);

    // Convert to degrees and adjust for conic-gradient (0° is at top)
    let angleDegrees = (angleRadians * 180) / Math.PI + 90;
    angleDegrees = (angleDegrees + 360) % 360;

    currentAngleRef.current = angleDegrees;
    ringRef.current.style.setProperty('--ring-angle', `${angleDegrees.toFixed(2)}deg`);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    // Save the current angle as the new base for the animation
    setBaseAngle(currentAngleRef.current);
    setIsHovering(false);
  }, []);

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
            <div
              ref={ringRef}
              className="absolute -inset-3 rounded-full"
              onPointerMove={handlePointerMove}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              style={{ '--ring-angle': '0deg' } as React.CSSProperties}
            >
              <div
                className={`absolute inset-0 rounded-full ${isHovering ? '' : 'animate-spin-slow'}`}
                style={{
                  background: isHovering
                    ? 'conic-gradient(from var(--ring-angle), transparent, var(--accent-primary), transparent)'
                    : `conic-gradient(from ${baseAngle}deg, transparent, var(--accent-primary), transparent)`,
                  animationDuration: '8s',
                }}
              />
              <div className="absolute inset-[2px] rounded-full bg-page" />
            </div>

            {/* Image container */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-border-subtle pointer-events-none">
              <img
                src={`${import.meta.env.BASE_URL}marco-small.jpg`}
                alt={siteData.profile.name}
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
              {siteData.profile.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent font-mono font-medium mb-6">
              {siteData.profile.title}
            </p>

            <p className="text-body max-w-lg mb-8 text-balance">
              {siteData.profile.headline}
            </p>

            {/* Quick info tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
              {siteData.profile.tags.map((tag) => (
                <span key={tag} className="badge">{tag}</span>
              ))}
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
