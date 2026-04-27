import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Code2, ExternalLink, Mail, type LucideIcon } from 'lucide-react';
import { ContactChannelCard } from '../components/ContactChannelCard';
import { SectionHeader } from '../components/SectionHeader';
import { TopicList } from '../components/TopicList';
import Section from '../components/Section';
import { siteData } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: ExternalLink,
  github: Code2,
};

const Contact = () => {
  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement>) => {
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
        <div>
          <SectionHeader
            kicker="// connect"
            title={siteData.contact.heading}
            titleId="contact-heading"
            titleSpacingClassName="mb-6"
            intro={
              <p className="text-body mb-8">
                {siteData.contact.intro}
              </p>
            }
          />

          <TopicList topics={siteData.contact.topics} />
        </div>

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
              return (
                <ContactChannelCard
                  key={channel.type}
                  channel={channel}
                  icon={Icon}
                  href={getHref(channel.type)}
                  onClick={getClickHandler(channel.type)}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;
