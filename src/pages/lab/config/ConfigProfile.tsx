import { motion } from 'framer-motion';
import { UIConfig } from './ui-config';
import { siteData } from '../../../data/siteData';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ConfigProfileProps {
  config: UIConfig;
}

// Theme-based classes
function getThemeClasses(config: UIConfig) {
  const { theme } = config;

  const accentColors = {
    amber: { text: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500' },
    cyan: { text: 'text-cyan-500', border: 'border-cyan-500', bg: 'bg-cyan-500' },
    emerald: { text: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-500' },
    rose: { text: 'text-rose-500', border: 'border-rose-500', bg: 'bg-rose-500' },
  };

  const fontClasses = {
    sans: 'font-sans',
    mono: 'font-mono',
    mixed: '',
  };

  return {
    accent: accentColors[theme.accentColor],
    font: fontClasses[theme.fontStyle],
    isTerminal: theme.variant === 'terminal',
    isMinimal: theme.variant === 'minimal',
    isWarm: theme.variant === 'warm',
  };
}

// Hero Section
function HeroSection({ config, theme }: { config: UIConfig; theme: ReturnType<typeof getThemeClasses> }) {
  const heroConfig = config.sections.hero;

  const headlines: Record<string, string> = {
    default: siteData.profile.headline,
    technical: "PhD in distributed AI, now building AI-powered tools. I write code that AI can reason about and tests that prove it works.",
    nonTechnical: "Engineering leader with 20+ years experience. Built and scaled teams from 2 to 18. Currently leading AI product development.",
  };

  return (
    <section className="min-h-[50vh] flex items-center py-16">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {theme.isTerminal && (
            <span className={`text-sm font-mono ${theme.accent.text} mb-2 block`}>
              $ whoami
            </span>
          )}

          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme.font}`}>
            {siteData.profile.name}
          </h1>

          <p className={`text-xl ${theme.accent.text} mb-6 ${theme.font}`}>
            {siteData.profile.title}
          </p>

          <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
            {headlines[heroConfig.headlineVariant]}
          </p>

          {heroConfig.showTags && (
            <div className="flex flex-wrap gap-2 mt-6">
              {siteData.profile.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-sm border ${theme.accent.border} ${theme.accent.text} bg-transparent`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ config, theme }: { config: UIConfig; theme: ReturnType<typeof getThemeClasses> }) {
  const contactConfig = config.sections.contact;

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encoded = siteData.profile.social.email;
    window.location.href = `mailto:${atob(encoded)}`;
  };

  return (
    <section className={`py-16 ${contactConfig.prominent ? 'bg-page-elevated' : ''}`}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={contactConfig.prominent ? 'text-center' : ''}
        >
          {theme.isTerminal ? (
            <span className={`text-sm font-mono ${theme.accent.text} mb-4 block`}>
              // contact
            </span>
          ) : (
            <span className={`text-sm uppercase tracking-wider ${theme.accent.text} mb-4 block`}>
              Contact
            </span>
          )}

          <h2 className={`text-3xl font-bold mb-4 ${theme.font}`}>
            {siteData.contact.heading}
          </h2>

          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            {siteData.contact.intro}
          </p>

          <div className={`flex gap-4 flex-wrap ${contactConfig.prominent ? 'justify-center' : ''}`}>
            <a
              href="#"
              onClick={handleEmailClick}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg border ${theme.accent.border} ${theme.accent.text} hover:bg-page-elevated transition-colors`}
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a
              href={siteData.profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border-subtle hover:border-text-muted transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ExternalLink size={14} className="opacity-50" />
            </a>
            <a
              href={siteData.profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border-subtle hover:border-text-muted transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
              <ExternalLink size={14} className="opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ConfigProfile({ config }: ConfigProfileProps) {
  const theme = getThemeClasses(config);

  // Background based on theme variant
  const bgClass = theme.isTerminal
    ? 'bg-[#0a0a0a]'
    : theme.isWarm
      ? 'bg-[#1a1614]'
      : 'bg-page';

  return (
    <div className={`min-h-screen ${bgClass} ${theme.font}`}>
      <HeroSection config={config} theme={theme} />
      <ContactSection config={config} theme={theme} />

      {/* Config debug panel */}
      <div className="fixed bottom-4 right-4 z-40">
        <details className="bg-page-elevated/95 backdrop-blur border border-border-subtle rounded-lg overflow-hidden max-w-sm">
          <summary className="px-4 py-2 cursor-pointer text-sm font-mono text-text-muted hover:text-text-primary">
            Generated Config
          </summary>
          <pre className="text-xs p-4 max-h-60 overflow-auto text-text-muted">
            {JSON.stringify(config, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}

