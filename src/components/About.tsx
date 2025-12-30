import { motion } from 'framer-motion';
import { Code, Users, TestTube } from 'lucide-react';
import Section from './Section';
import SpotlightCard from './ui/SpotlightCard';

const pillars = [
  {
    icon: Code,
    title: 'Code that AI can reason about',
    description: 'Simple architecture, clear patterns, documentation about the why—not just the what',
  },
  {
    icon: Users,
    title: 'Engineers using AI as a multiplier',
    description: 'Working alongside a fast junior developer who\'s read a lot of code but knows nothing about your product, your users, or your roadmap',
  },
  {
    icon: TestTube,
    title: 'Tests as the ultimate lifeline',
    description: 'The one thing that still proves your code works, whether you wrote it or AI did',
  },
];

const About = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        {/* The Shift - Opening Thesis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="about-heading" className="heading-lg mb-6">
            The Engineering Profession Is Changing
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-body">
            Software development has always been about raising the level of abstraction. We went from punch cards to assembler, then to higher-level languages, then to frameworks and libraries. Along the way, we got comfortable trusting code we didn't write. Most of us don't read the source of every npm package we install—we trust GitHub stars, recent commits, audit tools.
          </p>
          <p className="text-body">
            Now we're at the next level: AI generating code from our instructions. We can still read the output. But once we build trust, will we?
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-6 group">
                <div className="p-3 rounded-lg bg-accent/5 text-accent group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300 ring-1 ring-accent/10 w-fit mb-4">
                  <pillar.icon className="w-6 h-6" />
                </div>
                <h3 className="heading-md mb-2 text-lg">{pillar.title}</h3>
                <p className="text-muted">{pillar.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10"
        >
          <p className="text-body border-l-2 border-accent pl-6 italic">
            Your job hasn't changed: deliver code that you've proven works. What's changed is how you get there.
          </p>
        </motion.div>

        {/* Personal Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-border-subtle"
        >
          <h3 className="heading-md mb-6 text-accent">About Me</h3>
          <div className="space-y-5">
            <p className="text-body">
              I spent over a decade at TU-Berlin researching how to build adaptive user interfaces—systems that work across phones, tablets, smart homes, and respond to voice, touch, gestures. We called it multimodal interaction. Today, it's closer to what people mean by generative UI.
            </p>
            <p className="text-body">
              After my PhD, I spent two years traveling, then moved into startups. I built engineering teams from scratch, scaled a smart home company, raised funding as CTO of an IoT energy platform, and worked as a freelance consultant across sustainability and tech. I've always preferred greenfield projects—building something new from nothing.
            </p>
            <p className="text-body">
              Now I'm Director of Software Engineering at CHAPTR, a startup within the Holtzbrinck Publishing Group. We're Holtzbrinck's AI strategy. I work mainly on reedy.ai, a platform that uses AI to improve book metadata, optimize discoverability, and make large catalogs semantically searchable.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;

