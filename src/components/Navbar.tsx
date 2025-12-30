import { useState, useEffect } from 'react';
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'glass-strong border-border-subtle/50 py-2'
          : 'bg-transparent border-transparent py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-mono font-bold text-xl text-text-primary tracking-tighter hover:text-accent transition-colors relative group"
          >
            <span className="relative z-10">MB</span>
            <span className="absolute -inset-2 bg-accent/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-0"></span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1" aria-label="Desktop navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-all rounded-full hover:bg-surface relative group"
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
            <div className="w-px h-6 bg-border-active mx-2"></div>
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-accent hover:bg-accent/10 rounded-full transition-all focus-ring"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-primary rounded-lg transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-text-secondary hover:text-primary rounded-lg transition-colors"
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-strong border-b border-border-subtle overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3 text-lg font-medium text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
