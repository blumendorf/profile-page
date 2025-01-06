import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          © {currentYear} Dr Marco Blumendorf. All rights reserved.
        </div>
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <Link to="/privacy-policy" className="hover:text-gray-800 dark:hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/impressum" className="hover:text-gray-800 dark:hover:text-white">
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}