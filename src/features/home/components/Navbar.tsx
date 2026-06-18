import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HomeNavLink } from './NavLink';
import { JsonModeToggle } from './JsonModeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Journey', href: '#journey' },
  { label: 'Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
];

// Map nav section IDs to JSON keys (bidirectional)
const sectionToJsonKey: Record<string, string> = {
  'home': 'profile',
  'about': 'about',
  'expertise': 'expertise',
  'tech-stack': 'techStack',
  'journey': 'journey',
  'lab': 'lab',
  'contact': 'contact',
};

const jsonKeyToSection: Record<string, string> = {
  'profile': 'home',
  'about': 'about',
  'expertise': 'expertise',
  'techStack': 'tech-stack',
  'journey': 'journey',
  'lab': 'lab',
  'contact': 'contact',
};

interface NavbarProps {
  isJsonMode: boolean;
  onToggleJsonMode: () => void;
  onNavigateInJsonMode: (section: string | null) => void;
  focusedJsonSection: string | null;
}

const Navbar = ({ isJsonMode, onToggleJsonMode, onNavigateInJsonMode, focusedJsonSection }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Calculate active section based on scroll position
  const calculateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Check if at bottom of page first (for Contact)
    const bottomThreshold = 100;
    const isAtBottom = windowHeight + scrollY >= document.body.offsetHeight - bottomThreshold;

    if (isAtBottom) {
      return 'contact';
    }

    // The "trigger line" - a section is active when its top crosses this point
    // Using 30% from the top of the viewport
    const triggerPoint = scrollY + windowHeight * 0.3;

    // Go through sections in reverse order (bottom to top)
    // Find the first section whose top is above the trigger point
    const sectionIds = navItems.map(item => item.href.replace('#', ''));

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const element = document.getElementById(id);

      if (element) {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;

        // If this section's top is above the trigger point, it's the active one
        if (sectionTop <= triggerPoint) {
          return id;
        }
      }
    }

    // Default to first section
    return 'home';
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setActiveSection(calculateActiveSection());
    };

    // Calculate on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateActiveSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // Close mobile menu first
    const wasOpen = isOpen;
    setIsOpen(false);

    // Scroll function
    const scrollToSection = () => {
      if (isJsonMode) {
        const jsonKey = sectionToJsonKey[targetId];
        onNavigateInJsonMode(jsonKey || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    // If mobile menu was open, delay scroll until after menu animation (200ms)
    if (wasOpen) {
      setTimeout(scrollToSection, 250);
    } else {
      scrollToSection();
    }
  };

  const isAtHero = activeSection === 'home' && !isJsonMode;

  // Determine which section is "active" for nav highlighting
  const getActiveSection = () => {
    if (isJsonMode && focusedJsonSection) {
      return jsonKeyToSection[focusedJsonSection] || null;
    }
    return activeSection;
  };

  const currentActiveSection = getActiveSection();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-page/80 backdrop-blur-xl border-border-subtle shadow-xs shadow-black/5 py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
      aria-label="Main navigation"
    >
<div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - hidden when at hero section */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={`font-mono font-semibold text-base sm:text-lg truncate max-w-[200px] sm:max-w-none text-text-primary hover:text-accent transition-all duration-300 ${
              isAtHero ? 'opacity-0 -translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'
            }`}
            tabIndex={isAtHero ? -1 : 0}
            aria-hidden={isAtHero}
          >
            Dr Marco Blumendorf<span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" aria-label="Desktop navigation">
            {navItems.slice(1).map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = currentActiveSection === sectionId;
              return (
                <HomeNavLink
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  isActive={isActive}
                  variant="desktop"
                >
                  {item.label}
                </HomeNavLink>
              );
            })}
            <div className="w-px h-4 bg-border-subtle mx-2" />
            <JsonModeToggle isJsonMode={isJsonMode} onClick={onToggleJsonMode} size="default" />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <JsonModeToggle
              isJsonMode={isJsonMode}
              onClick={onToggleJsonMode}
              size="compact"
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-muted hover:text-text-primary rounded-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-page border-b border-border-subtle overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = currentActiveSection === sectionId;
                return (
                  <HomeNavLink
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    isActive={isActive}
                    variant="mobile"
                  >
                    {item.label}
                  </HomeNavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

