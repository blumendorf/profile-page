import { motion } from 'framer-motion';
import { Code, Users, TestTube, Briefcase, TrendingUp, Cpu, SplitSquareHorizontal, LucideIcon } from 'lucide-react';
import Section from './Section';
import ShineCard from './ui/ShineCard';
import SplitView from './ui/SplitView';
import { usePersona, Persona } from '../contexts/PersonaContext';
import { siteData } from '../data/siteData';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Users,
  TestTube,
  Briefcase,
  TrendingUp,
  Cpu,
};

interface AboutContentProps {
  persona: Persona;
}

const AboutContent = ({ persona }: AboutContentProps) => {
  // Get variant-specific or default content
  const variantData = (siteData as any).aboutVariants?.[persona];
  const paragraphs = variantData?.paragraphs ?? siteData.about.paragraphs;
  const pillars = variantData?.pillars ?? siteData.about.pillars;

  // Variant-specific styling
  const isTechnical = persona === 'technical';
  const accentClass = isTechnical ? 'text-cyan-500' : 'text-accent';
  const borderAccentClass = isTechnical ? 'border-cyan-500' : 'border-accent';

  return (
    <div className="space-y-12">
      {/* Paragraphs */}
      <div className="space-y-5">
        {paragraphs.map((paragraph: string, index: number) => (
          <p key={index} className="text-body">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Quote */}
      <blockquote className={`quote text-body ${borderAccentClass}`}>
        {siteData.about.quote}
      </blockquote>

      {/* Pillars */}
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar: any) => {
          const Icon = iconMap[pillar.icon] || Code;
          return (
            <div key={pillar.title}>
              <ShineCard className="h-full group">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className={`w-5 h-5 ${accentClass}`} />
                  <h4 className="font-mono text-sm font-medium text-text-primary">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </ShineCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const About = () => {
  const { isSplitMode, toggleSplitMode } = usePersona();

  if (isSplitMode) {
    return (
      <Section id="about">
        {/* Header with split toggle */}
        <div className="mb-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label block"
          >
            // about
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <h2 id="about-heading" className="heading-lg">
              {siteData.about.heading}
            </h2>
<button
              onClick={toggleSplitMode}
              className="p-2 rounded-lg bg-accent text-bg-page hover:bg-accent/90 transition-colors"
              aria-label="Exit split view"
              title="Exit split view"
            >
              <SplitSquareHorizontal size={18} />
            </button>
          </motion.div>
        </div>

        <SplitView
          nonTechnicalContent={<AboutContent persona="nonTechnical" />}
          technicalContent={<AboutContent persona="technical" />}
        />
      </Section>
    );
  }

  // Default view (non-split) uses original content
  return (
    <Section id="about">
      <div className="space-y-12">
        {/* About Me - Main Section */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label block"
          >
            // about
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-8"
          >
            <h2 id="about-heading" className="heading-lg">
              {siteData.about.heading}
            </h2>
            <button
              onClick={toggleSplitMode}
              className="p-2 rounded-lg border border-border-subtle text-text-muted
                         hover:border-accent hover:text-accent transition-colors"
              aria-label="Compare views: see how different audiences view this section"
              title="Compare views: see how different audiences view this section"
            >
              <SplitSquareHorizontal size={18} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {siteData.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="quote text-body"
        >
          {siteData.about.quote}
        </motion.blockquote>

        {/* Pillars - What I Focus On */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {siteData.about.pillars.map((pillar, index) => {
              const Icon = iconMap[pillar.icon] || Code;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <ShineCard className="h-full group">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                      <h4 className="font-mono text-sm font-medium text-text-primary">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </ShineCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
