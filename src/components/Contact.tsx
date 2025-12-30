import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import Section from './Section';

// Obfuscated email - base64 encoded
const encodedEmail = 'bWFyY29AYmx1bWVuZG9yZi5pbmZv';

const Contact = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = atob(encodedEmail);
    window.location.href = `mailto:${email}`;
  };

  return (
    <Section id="contact">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-lg mb-6"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-body mb-10"
        >
          Want to talk about engineering leadership in the AI era? Building AI-ready systems?
          Or just curious where software development is headed? Let's connect.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            onClick={handleEmailClick}
            className="btn-primary w-full sm:w-auto"
            aria-label="Contact via Email"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>

          <a
            href="https://linkedin.com/in/marcoblu"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
            aria-label="Connect on LinkedIn"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/blumendorf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
            aria-label="View GitHub profile at github.com/blumendorf"
          >
            <Github size={18} />
            <span>GitHub</span>
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;

