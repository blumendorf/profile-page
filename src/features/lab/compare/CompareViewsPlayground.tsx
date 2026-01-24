import { Link } from 'react-router-dom';
import { ArrowLeft, SplitSquareHorizontal, Code, Users, TestTube, Briefcase, TrendingUp, Cpu, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import SplitView from '@/components/ui/SplitView';
import ShineCard from '@/components/ui/ShineCard';
import { PersonaProvider } from '@/features/shared';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Users,
  TestTube,
  Briefcase,
  TrendingUp,
  Cpu,
};

interface Pillar {
  icon: string;
  title: string;
  description: string;
}

interface ContentProps {
  persona: 'nonTechnical' | 'technical';
}

// Content variants for the experiment
const contentVariants = {
  nonTechnical: {
    paragraphs: [
      "20+ years in software engineering, from academic research to startup leadership to enterprise AI strategy. I've built engineering organizations from scratch and scaled them through growth phases.",
      "Track record: Led a smart home development team from 2 to 18 engineers. Raised funding as CTO. Now directing software engineering at a Holtzbrinck Publishing Group company, leading their AI product strategy.",
      "I focus on developer experience, team culture, and bridging the gap between product vision and technical execution. My teams ship quality code while maintaining velocity."
    ],
    pillars: [
      {
        icon: "Briefcase",
        title: "Scaled teams 2 → 18",
        description: "Built engineering organizations from scratch at multiple startups through growth phases."
      },
      {
        icon: "Users",
        title: "Bridge product & engineering",
        description: "Translate business needs into technical strategy and delivery milestones."
      },
      {
        icon: "TrendingUp",
        title: "AI strategy at enterprise scale",
        description: "Leading AI product development for Holtzbrinck Publishing Group."
      }
    ],
    quote: "Your job hasn't changed: deliver code that you've proven works. What's changed is how you get there."
  },
  technical: {
    paragraphs: [
      "My PhD at TU-Berlin was on adaptive user interfaces-what we now call generative UI. I spent a decade building systems that work across devices and modalities: voice, touch, gestures, smart environments.",
      "These days I'm at CHAPTR building reedy.ai. The stack is React/TypeScript frontend, Python backend, heavy LLM integration (OpenAI, Claude, Cohere). We use Firestore, BigQuery, Typesense for data and search.",
      "My current obsession: structuring codebases so AI tools can actually help. Simple architecture, clear patterns, documentation about why-not just what. Tests are the ultimate lifeline."
    ],
    pillars: [
      {
        icon: "Code",
        title: "Code that AI can reason about",
        description: "Simple architecture, clear patterns, documentation about the why-not just the what."
      },
      {
        icon: "Cpu",
        title: "LLM-first development",
        description: "OpenAI, Claude, Cohere, LangChain-integrating AI into production systems daily."
      },
      {
        icon: "TestTube",
        title: "Tests as the ultimate lifeline",
        description: "The one thing that still proves your code works, whether you wrote it or AI did."
      }
    ],
    quote: "Your job hasn't changed: deliver code that you've proven works. What's changed is how you get there."
  }
};

const AboutContent = ({ persona }: ContentProps) => {
  const content = contentVariants[persona];
  const { paragraphs, pillars, quote } = content;

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
        {quote}
      </blockquote>

      {/* Pillars */}
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar: Pillar) => {
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

export function CompareViewsPlayground() {
  return (
    <PersonaProvider>
      <div className="min-h-screen bg-page">
        <div className="max-w-6xl mx-auto px-8 py-16">
          {/* Back link */}
          <Link
            to="/lab"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to lab</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg">
                <SplitSquareHorizontal className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs font-mono text-text-muted bg-page-elevated px-2 py-1 rounded-sm">
                UX
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Compare Views</h1>
            <p className="text-text-muted text-lg leading-relaxed max-w-3xl">
              An experiment in adaptive content presentation. The same content, tailored for different audiences-drag the divider to compare how technical vs. non-technical readers experience the same information.
            </p>
          </div>

          {/* Explanation */}
          <div className="mb-8 p-6 rounded-lg border border-border-subtle bg-page-elevated">
            <h2 className="text-xl font-semibold mb-3">About this experiment</h2>
            <div className="space-y-3 text-text-muted">
              <p>
                This feature allows viewers to see how content adapts based on audience. Technical and non-technical peers each see information framed differently.
              </p>
              <p className="text-sm">
                <strong>Try it:</strong> Drag the divider to see how the same career story shifts in tone, focus, and technical depth.
              </p>
            </div>
          </div>

          {/* Split View Demo */}
          <div className="relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="section-label block mb-4"
            >
              // interactive demo
            </motion.span>

            <SplitView
              nonTechnicalContent={<AboutContent persona="nonTechnical" />}
              technicalContent={<AboutContent persona="technical" />}
            />
          </div>

        </div>
      </div>
    </PersonaProvider>
  );
}

export default CompareViewsPlayground;
