export default function Footer() {
  const encodedEmail = 'bWFyY29AYmx1bWVuZG9yZi5pbmZv';

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const decodedEmail = atob(encodedEmail);
    window.location.href = `mailto:${decodedEmail}`;
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4 items-center">
            <a href="#" onClick={handleEmailClick} className="hover:text-accent">
              Contact
            </a>
            <span>|</span>
            <a href="https://linkedin.com/in/marcoblu" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              LinkedIn
            </a>
            <span>|</span>
            <a href="https://github.com/blumendorf" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              GitHub
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Dr Marco Blumendorf
          </p>
        </div>
      </div>
    </footer>
  )
}