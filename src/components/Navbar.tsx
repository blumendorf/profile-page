import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

interface NavbarProps {
  isLLMMode: boolean;
  onToggleLLMMode: () => void;
}

const Navbar = ({ isLLMMode, onToggleLLMMode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

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
    const element = document.getElementById(targetId);
    if (element) {
      // Offset for fixed header
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const isAtHero = activeSection === 'home';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-page/80 backdrop-blur-xl border-border-subtle shadow-sm shadow-black/5 py-3'
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
          <div className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
            {navItems.slice(1).map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="w-px h-4 bg-border-subtle mx-2" />
            <button
              onClick={onToggleLLMMode}
              className={`px-2 py-1 text-xs font-mono font-bold rounded border transition-colors ${
                isLLMMode
                  ? 'bg-accent text-bg-page border-accent hover:bg-accent/90'
                  : 'bg-transparent text-text-muted border-text-muted hover:text-text-primary hover:border-text-primary'
              }`}
              aria-label={isLLMMode ? 'Switch to Human mode' : 'Switch to LLM mode'}
            >
              {isLLMMode ? '{JSON}' : 'JSON'}
            </button>
            <div className="w-px h-4 bg-border-subtle mx-2" />
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-accent rounded-md transition-colors focus-ring"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleLLMMode}
              className={`px-2 py-1 text-xs font-mono font-bold rounded border transition-colors ${
                isLLMMode
                  ? 'bg-accent text-bg-page border-accent'
                  : 'bg-transparent text-text-muted border-text-muted'
              }`}
            >
              JSON
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted hover:text-accent rounded-md transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
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
            className="md:hidden bg-page border-b border-border-subtle overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2.5 text-base font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-accent bg-surface/50'
                        : 'text-text-muted hover:text-text-primary hover:bg-surface'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
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
