export default function Navbar() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
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
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Home</a>
            <a href="#about" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">About</a>
            <a href="#tech-stack" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Tech Stack</a>
            <a href="#services" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Services</a>
            <a href="#contact" className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-accent-light transition-colors duration-200">Contact</a>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}