import { useState, useEffect } from 'react';

const DarkModeIcon = () => (
  <svg
    className="w-6 h-6 text-gray-600 dark:text-gray-300"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      className="hidden dark:block"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
    <path
      className="block dark:hidden"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check local storage on mount, default to dark mode if not set
    const isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode === null) {
      // If no preference is stored, set dark mode as default
      localStorage.setItem('darkMode', 'true');
      document.documentElement.classList.add('dark');
    } else {
      // Apply stored preference
      if (isDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDarkMode.toString());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 shadow-sm fixed w-full z-20 top-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-accent dark:text-accent-light">
              Dr Marco Blumendorf
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Home</a>
            <a href="#about" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">About</a>
            <a href="#expertise" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Expertise</a>
            <a href="#tech-stack" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Tech Stack</a>
            <a href="#timeline" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Timeline</a>
            <a href="#contact" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Contact</a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              <DarkModeIcon />
            </button>
          </div>

          {/* Mobile Menu Button - Move outside the mobile menu overlay */}
          <div className="lg:hidden flex items-center z-40 relative">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
              title="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed left-0 right-0 top-16 z-30 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg min-h-screen">
          <a onClick={() => setIsMenuOpen(false)} href="#home" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Home</a>
          <a onClick={() => setIsMenuOpen(false)} href="#about" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">About</a>
          <a onClick={() => setIsMenuOpen(false)} href="#tech-stack" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Tech Stack</a>
          <a onClick={() => setIsMenuOpen(false)} href="#timeline" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Timeline</a>
          <a onClick={() => setIsMenuOpen(false)} href="#services" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Services</a>
          <a onClick={() => setIsMenuOpen(false)} href="#contact" className="block px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Contact</a>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center px-3 py-2 text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200"
          >
            <DarkModeIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}