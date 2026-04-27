import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Badge, Button, TagList } from '@/components/ui';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { siteData } from '@/lib/data';

const Hero = () => {
  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl mx-auto py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <ProfileAvatar
            imageSrc={`${import.meta.env.BASE_URL}marco-small.jpg`}
            imageAlt={`Portrait photo of ${siteData.profile.name}`}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-4">
              {siteData.profile.name}
            </h1>

            <p className="text-xl sm:text-2xl text-accent font-mono font-medium mb-6">
              {siteData.profile.title}
            </p>

            <p className="text-body max-w-lg mb-8 text-balance">
              {siteData.profile.headline}
            </p>

            <TagList className="justify-center md:justify-start mb-8">
              {siteData.profile.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </TagList>

            <Button
              onClick={handleScrollToAbout}
              variant="primary"
              aria-label="Scroll to learn more"
            >
              <span>Learn more</span>
              <ArrowDown size={18} />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <div className="w-px h-12 bg-linear-to-b from-border-active to-transparent" />
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, var(--border-subtle), transparent)',
        }}
      />
    </section>
  );
};

export default Hero;
