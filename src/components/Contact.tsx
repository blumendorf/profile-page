import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageSquare } from 'lucide-react';
import Section from './Section';

// Obfuscated email - base64 encoded
const encodedEmail = 'bWFyY29AYmx1bWVuZG9yZi5pbmZv';

const topics = [
  'How AI is changing engineering',
  'Building developer experience that scales',
  'Greenfield projects and when to start fresh',
  'The publishing industry meets AI',
];

const Contact = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = atob(encodedEmail);
    window.location.href = `mailto:${email}`;
  };

  return (
    <Section id="contact">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left column - Text content */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label block"
          >
            // connect
          </motion.span>

          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-6"
          >
            Get in Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body mb-8"
          >
            I enjoy conversations about where software engineering is headed—especially the intersection of AI tooling, team culture, and building products that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-accent" />
              <span className="text-sm font-mono text-text-muted">Things I like talking about</span>
            </div>
            <ul className="space-y-2">
              {topics.map((topic, index) => (
                <motion.li
                  key={topic}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="text-sm text-text-secondary pl-4 border-l-2 border-border-subtle hover:border-accent transition-colors"
                >
                  {topic}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right column - Contact options */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:pt-14"
        >
          <div className="space-y-3">
            <a
              href="#"
              onClick={handleEmailClick}
              className="group flex items-center gap-4 p-4 rounded-lg border border-border-subtle hover:border-accent bg-surface/30 hover:bg-surface/50 transition-all"
              aria-label="Contact via Email"
            >
              <div className="p-2.5 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-page transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-medium text-text-primary">Email</div>
                <div className="text-sm text-text-muted">Best for longer conversations</div>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/marcoblu"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg border border-border-subtle hover:border-accent bg-surface/30 hover:bg-surface/50 transition-all"
              aria-label="Connect on LinkedIn"
            >
              <div className="p-2.5 rounded-md bg-surface text-text-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                <Linkedin size={20} />
              </div>
              <div>
                <div className="font-medium text-text-primary">LinkedIn</div>
                <div className="text-sm text-text-muted">Let's connect professionally</div>
              </div>
            </a>

            <a
              href="https://github.com/blumendorf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-lg border border-border-subtle hover:border-accent bg-surface/30 hover:bg-surface/50 transition-all"
              aria-label="View GitHub profile at github.com/blumendorf"
            >
              <div className="p-2.5 rounded-md bg-surface text-text-muted group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                <Github size={20} />
              </div>
              <div>
                <div className="font-medium text-text-primary">GitHub</div>
                <div className="text-sm text-text-muted">See what I'm building</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
