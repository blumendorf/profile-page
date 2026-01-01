import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical, Settings2, Code2, ArrowRight, Sparkles, TestTube2 } from 'lucide-react';

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accentColor: string;
  tag?: string;
}

function ExperimentCard({ title, description, icon, href, accentColor, tag }: ExperimentCardProps) {
  return (
    <Link
      to={href}
      className="block p-6 rounded-lg border border-border-subtle hover:border-current bg-page-elevated transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${accentColor}`}>
          {icon}
        </div>
        {tag && (
          <span className="text-xs font-mono text-text-muted bg-page px-2 py-1 rounded">
            {tag}
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex items-center gap-2 text-sm font-medium text-accent">
        <span>View</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export default function LabIndex() {
  const experiments = [
    {
      title: 'Browser AI: Config',
      description: 'A local AI model generates JSON to customize a profile page. The model runs entirely in your browser—no server needed.',
      icon: <Settings2 size={24} className="text-amber-500" />,
      href: '/lab/config',
      accentColor: 'bg-amber-500/20',
      tag: 'WebGPU',
    },
    {
      title: 'Browser AI: HTML',
      description: 'A local AI model generates complete HTML and CSS, rendered live in an iframe. Same model, different output format.',
      icon: <Code2 size={24} className="text-cyan-500" />,
      href: '/lab/html',
      accentColor: 'bg-cyan-500/20',
      tag: 'WebGPU',
    },
    {
      title: 'Living Canvas',
      description: 'An ambient, continuously evolving visual experience. The model generates mood phrases that smoothly transform colors, energy, and atmosphere.',
      icon: <Sparkles size={24} className="text-purple-500" />,
      href: '/lab/canvas',
      accentColor: 'bg-purple-500/20',
      tag: 'WebGPU',
    },
    {
      title: 'Prompt Evaluation',
      description: 'Automated testing framework for HTML generation. Runs constraint-based tests to measure prompt quality and model consistency.',
      icon: <TestTube2 size={24} className="text-green-500" />,
      href: '/lab/eval',
      accentColor: 'bg-green-500/20',
      tag: 'Testing',
    },
  ];

  return (
    <div className="min-h-screen bg-page flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back to profile</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-accent font-mono text-sm mb-4">
            <FlaskConical size={16} />
            <span>// lab</span>
          </div>
          <h1 className="text-4xl font-bold mt-2 mb-4">The Lab</h1>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto">
            A collection of experiments and writeups—things I'm tinkering with,
            exploring, or just documenting for future reference.
          </p>
        </div>

        {/* Experiments Grid */}
        <h2 className="text-sm font-mono text-text-muted mb-4">Experiments</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {experiments.map((experiment) => (
            <ExperimentCard key={experiment.title} {...experiment} />
          ))}
        </div>

        {/* Coming soon note */}
        <div className="text-center text-text-muted text-sm">
          <p>More experiments and writeups coming soon.</p>
        </div>
      </div>
    </div>
  );
}

