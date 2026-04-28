import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Code2, TestTube2, SplitSquareHorizontal, Layers } from 'lucide-react';
import { ExperimentCard } from './shared/components';

export default function LabIndex() {
  const experiments = [
    {
      title: 'Browser AI: HTML',
      description:
        'What happens when every web-page runs an LLM in the browser to influence its appearance?A local AI model generates complete HTML and CSS, rendered live in an iframe.',
      icon: <Code2 size={24} className="text-cyan-500" />,
      href: '/lab/html',
      accentColor: 'bg-cyan-500/20',
      tag: 'WebGPU',
    },
    {
      title: 'Prompt Evaluation',
      description:
        'Automated testing framework for HTML generation. Runs constraint-based tests to measure prompt quality and model consistency.',
      icon: <TestTube2 size={24} className="text-green-500" />,
      href: '/lab/eval',
      accentColor: 'bg-green-500/20',
      tag: 'Testing',
    },
    {
      title: 'Compare Views',
      description:
        'Adaptive content presentation experiment. The same content tailored for different audiences-drag the divider to compare technical vs. non-technical perspectives.',
      icon: <SplitSquareHorizontal size={24} className="text-purple-500" />,
      href: '/lab/compare',
      accentColor: 'bg-purple-500/20',
      tag: 'UX',
    },
    {
      title: 'UI/UX design in AI-assisted engineering',
      description:
        "Notes from running an AI-assisted UI/UX workflow on this site. A seven-part series on what changes in design when agents read the same files humans write.",
      icon: <Layers size={24} className="text-amber-500" />,
      href: '/lab/design-and-ai',
      accentColor: 'bg-amber-500/20',
      tag: 'Series',
    },
  ];

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to profile</span>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-sm mb-4">
            <FlaskConical size={16} />
            <span>// lab</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 mb-4">The Lab</h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto">
            A collection of experiments and writeups-things I&apos;m tinkering with, exploring, or
            just documenting for future reference.
          </p>
        </div>

        <h2 className="text-sm font-mono text-text-muted mb-4">Experiments</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.title} {...experiment} />
          ))}
        </div>

        <div className="text-center text-text-muted text-sm">
          <p>More experiments and writeups coming soon.</p>
        </div>
      </div>
    </div>
  );
}
