import { Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border-subtle py-8"
      role="contentinfo"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       border border-border-subtle text-text-muted text-sm
                       hover:border-accent hover:text-accent transition-colors"
          >
            <FlaskConical size={14} />
            <span>The Lab</span>
          </Link>

          <p className="text-center text-text-muted text-sm font-mono">
            © {currentYear} Dr Marco Blumendorf. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

