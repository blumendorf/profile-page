import { BookOpen, Boxes, ExternalLink, GitBranch, Palette, Sparkles } from 'lucide-react';
import { BackLink, Pill } from '../shared/components';

const designPrinciples = [
  {
    icon: Palette,
    title: 'DESIGN.md as intent',
    body:
      'The design file is the source of visual intent: colors, typography, spacing, surfaces, motion, and the overall notebook-like mood of the site.',
  },
  {
    icon: Boxes,
    title: 'Reusable components as implementation',
    body:
      'Shared UI primitives and feature components translate that intent into React and Tailwind patterns that can be reused without rewriting decisions.',
  },
  {
    icon: GitBranch,
    title: 'Storybook as feedback loop',
    body:
      'Storybook makes component states visible outside the page flow, so design drift is easier to spot before it becomes scattered across screens.',
  },
];

const syncChallenges = [
  'Tokens in DESIGN.md need to stay aligned with CSS utilities in src/index.css.',
  'Reusable components need to stay small enough to compose, but opinionated enough to protect the design language.',
  'Storybook stories need to show realistic states, otherwise they become a second source of misleading truth.',
  'AI-assisted changes need constraints, examples, and visual checks so generated code preserves the design system instead of inventing a new one.',
];

export function StorybookArticle() {
  const storybookHref = import.meta.env.DEV
    ? 'http://localhost:6006/'
    : `${import.meta.env.BASE_URL}storybook/`;

  return (
    <article className="min-h-screen bg-page text-text-primary">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:px-8">
        <BackLink className="mb-10">Back to lab</BackLink>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <BookOpen className="w-6 h-6 text-amber-500" />
            </div>
            <Pill className="bg-surface">Article</Pill>
          </div>

          <p className="section-label mb-4">// design system</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Storybook as a design system checkpoint
          </h1>
          <p className="text-body max-w-2xl">
            This site uses Storybook less as a component gallery and more as a workshop for
            keeping design intent, reusable implementation, and AI-assisted changes aligned.
          </p>
        </header>

        <section className="space-y-5 mb-12">
          <h2 className="heading-lg">Design starts in DESIGN.md</h2>
          <p className="text-muted leading-relaxed">
            <code className="font-mono text-accent">DESIGN.md</code> describes the site before
            it becomes code: the warm dark palette, amber accent, typography scale, spacing,
            surfaces, motion rules, and section-level behavior. It is not just documentation,
            it helps future edits preserve the same atmosphere.
          </p>
          <p className="text-muted leading-relaxed">
            The implementation lives in React components, Tailwind utilities, and data-driven
            sections. The challenge is making sure those layers keep saying the same thing as
            the design evolves.
          </p>
        </section>

        <section className="grid gap-4 mb-12">
          {designPrinciples.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-lg border border-border-subtle bg-surface/40 p-5"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-md bg-page">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="heading-md mb-2">{title}</h3>
                  <p className="text-muted leading-relaxed">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-5 mb-12">
          <h2 className="heading-lg">Reusable components are where intent becomes habit</h2>
          <p className="text-muted leading-relaxed">
            Components such as buttons, badges, tag lists, cards, navigation links, Lab panels,
            and form controls carry repeated design decisions. They keep spacing, focus states,
            borders, hover behavior, and typography from being re-decided in every screen.
          </p>
          <p className="text-muted leading-relaxed">
            That matters more when AI is helping write code. Without a small set of reusable
            pieces and clear examples, generated changes tend to be locally plausible but
            globally inconsistent.
          </p>
        </section>

        <section className="rounded-xl border border-border-subtle bg-surface p-6 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <h2 className="heading-md">The AI-supported engineering challenge</h2>
          </div>
          <p className="text-muted leading-relaxed mb-4">
            AI-supported engineering increases the speed of implementation, but it also
            increases the chance that design and code drift apart. The hard part is not just
            generating a component. It is preserving the system: tokens, accessibility, motion,
            copy tone, component boundaries, and user expectations.
          </p>
          <ul className="space-y-3">
            {syncChallenges.map((challenge) => (
              <li
                key={challenge}
                className="pl-4 border-l-2 border-border-subtle text-sm text-text-secondary"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-accent/30 bg-accent/10 p-6">
          <h2 className="heading-md mb-3">Open the visual workshop</h2>
          <p className="text-muted leading-relaxed mb-5">
            Storybook is where the reusable pieces can be inspected in isolation: primitives,
            Home components, Lab components, and larger existing visuals. It is the practical
            checkpoint between design documentation and shipped implementation.
          </p>
          <a
            href={storybookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-bg-page font-medium text-sm hover:brightness-110 transition-all focus-ring"
          >
            <span>Open Storybook</span>
            <ExternalLink size={16} />
          </a>
        </section>
      </div>
    </article>
  );
}

export default StorybookArticle;
