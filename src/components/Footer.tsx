const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border-subtle py-8"
      role="contentinfo"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <p className="text-center text-text-muted text-sm font-mono">
          © {currentYear} Dr Marco Blumendorf. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
