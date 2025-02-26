export default function Contact() {
  // Base64 encoded email - this helps prevent basic email scraping
  const encodedEmail = 'bWFyY29AYmx1bWVuZG9yZi5pbmZv';

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = atob(encodedEmail);

    // Check if we're in a test environment
    if (process.env.NODE_ENV === 'test') {
        // Do nothing or implement test-specific behavior
        return;
    }

    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="section-container">
      <h2 className="heading-secondary text-center">Get in Touch</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
        Let's create intelligent solutions together. Whether you need a consultant, developer, or AI strategist, I'm here to help your business thrive in the age of AI.
      </p>

      <div className="max-w-lg mx-auto grid gap-6">
        {/* Email Contact */}
        <a
          href="#"
          onClick={handleEmailClick}
          className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-all duration-300"
          aria-label="Contact via Email"
        >
          <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
            <p className="text-accent group-hover:text-accent-dark dark:group-hover:text-accent-light transition-colors duration-300">
              Contact via Email
            </p>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* LinkedIn Contact */}
        <a
          href="https://linkedin.com/in/marcoblu"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-all duration-300"
          aria-label="Connect on LinkedIn"
        >
          <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
            <svg
              className="w-6 h-6 text-accent"
              fill="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">LinkedIn</h3>
            <p className="text-accent group-hover:text-accent-dark dark:group-hover:text-accent-light transition-colors duration-300">
              linkedin.com/in/marcoblu
            </p>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors duration-300"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* GitHub Contact */}
        <a
          href="https://github.com/blumendorf"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-all duration-300"
        >
          <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors duration-300">
            <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">GitHub</h3>
            <p className="text-accent group-hover:text-accent-dark dark:group-hover:text-accent-light transition-colors duration-300">
              github.com/blumendorf
            </p>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors duration-300"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  )
}