import { motion } from 'framer-motion';
import { Code, Users, TestTube } from 'lucide-react';
import Section from './Section';

const pillars = [
  {
    icon: Code,
    title: 'Code that AI can reason about',
    description: 'Simple architecture, clear patterns, documentation about the why—not just the what.',
  },
  {
    icon: Users,
    title: 'Engineers using AI as a multiplier',
    description: 'Working alongside a fast junior developer who\'s read everything but knows nothing about your product.',
  },
  {
    icon: TestTube,
    title: 'Tests as the ultimate lifeline',
    description: 'The one thing that still proves your code works, whether you wrote it or AI did.',
  },
];

const About = () => {
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

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg mb-8"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-body">
              I spent over a decade at TU-Berlin researching how to build adaptive user interfaces—systems that work across phones, tablets, smart homes, and respond to voice, touch, gestures. We called it multimodal interaction. Today, it's closer to what people mean by generative UI.
            </p>
            <p className="text-body">
              After my PhD, I spent two years traveling, then moved into startups. I built engineering teams from scratch, scaled a smart home company, raised funding as CTO of an IoT energy platform, and worked as a freelance consultant across sustainability and tech. I've always preferred greenfield projects—building something new from nothing.
            </p>
            <p className="text-body">
              Now I'm Director of Software Engineering at CHAPTR, a startup within the Holtzbrinck Publishing Group. We're Holtzbrinck's AI strategy. I work mainly on reedy.ai, a platform that uses AI to improve book metadata, optimize discoverability, and make large catalogs semantically searchable.
            </p>
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
          Your job hasn't changed: deliver code that you've proven works. What's changed is how you get there.
        </motion.blockquote>


        {/* Pillars - What I Focus On */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <pillar.icon className="w-5 h-5 text-accent" />
                  <h4 className="font-mono text-sm font-medium text-text-primary">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </Section>
  );
};

export default About;
