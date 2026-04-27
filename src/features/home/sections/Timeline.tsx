import { SectionHeader } from '../components/SectionHeader';
import { TimelineItem } from '../components/TimelineItem';
import Section from '../components/Section';
import { siteData } from '@/lib/data';

const Timeline = () => {
  return (
    <Section id="journey">
      <SectionHeader
        kicker="// journey"
        title={siteData.journey.heading}
        titleId="journey-heading"
        titleSpacingClassName="mb-12"
      />

      <div className="relative ml-6">
        <div className="timeline-line" />

        {siteData.journey.phases.map((phase, index) => (
          <TimelineItem
            key={phase.title}
            index={index}
            title={phase.title}
            period={phase.period}
            description={phase.description}
            isCurrent={phase.isCurrent}
          />
        ))}
      </div>
    </Section>
  );
};

export default Timeline;
