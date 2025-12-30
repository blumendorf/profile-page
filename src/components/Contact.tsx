import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageSquare, LucideIcon } from 'lucide-react';
import Section from './Section';
import { siteData } from '../data/siteData';

const iconMap: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
};

const Contact = () => {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = atob(siteData.profile.social.email);
    window.location.href = `mailto:${email}`;
  };

  const getHref = (type: string) => {
    switch (type) {
      case 'email':
        return '#';
      case 'linkedin':
        return siteData.profile.social.linkedin;
      case 'github':
        return siteData.profile.social.github;
      default:
        return '#';
    }
  };

  const getClickHandler = (type: string) => {
    if (type === 'email') {
      return handleEmailClick;
    }
    return undefined;
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
            {siteData.contact.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-body mb-8"
          >
            {siteData.contact.intro}
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
              {siteData.contact.topics.map((topic, index) => (
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
            {siteData.contact.channels.map((channel) => {
              const Icon = iconMap[channel.type] || Mail;
              const isEmail = channel.type === 'email';

              return (
                <a
                  key={channel.type}
                  href={getHref(channel.type)}
                  onClick={getClickHandler(channel.type)}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  className={`group flex items-center gap-4 p-4 rounded-lg border border-border-subtle hover:border-accent bg-surface/30 hover:bg-surface/50 transition-all`}
                  aria-label={isEmail ? 'Contact via Email' : `${channel.label} profile`}
                >
                  <div className={`p-2.5 rounded-md transition-colors ${
                    isEmail
                      ? 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-page'
                      : 'bg-surface text-text-muted group-hover:bg-accent/10 group-hover:text-accent'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{channel.label}</div>
                    <div className="text-sm text-text-muted">{channel.description}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
