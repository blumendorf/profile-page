export default function Navbar() {
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
          </div>
        </div>
      </div>
    </nav>
  )
}