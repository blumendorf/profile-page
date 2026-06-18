import { Cpu, Users, Briefcase, type LucideIcon } from 'lucide-react';
import Section from '../components/Section';
import { SectionHeader } from '../components/SectionHeader';
import { FeatureCard } from '../components/FeatureCard';
import { siteData } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  Users,
  Briefcase,
};

const Expertise = () => {
  return (
    <Section id="expertise">
      <SectionHeader
        kicker="// expertise"
        title={siteData.expertise.heading}
        titleId="expertise-heading"
        subheading={siteData.expertise.subheading}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {siteData.expertise.areas.map((area, index) => {
          const Icon = iconMap[area.icon] || Cpu;
          return (
            <FeatureCard
              key={area.title}
              title={area.title}
              description={area.description}
              icon={Icon}
              index={index}
            />
          );
        })}
      </div>
    </Section>
  );
};

export default Expertise;
