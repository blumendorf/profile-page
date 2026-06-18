import { type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Button, TagList } from '@/components/ui';

/**
 * Visual index of `index.css` @utility / semantic patterns that are not tied to a single component.
 */
const meta = {
  title: 'Foundations/CSS utilities',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Panel = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-2 border border-border-subtle rounded-lg p-4 bg-surface/40">
    <h3 className="text-xs font-mono text-text-muted uppercase tracking-wider">{title}</h3>
    {children}
  </section>
);

export const Primitives: Story = {
  render: () => (
    <div className="min-h-screen bg-page text-text-primary p-8 max-w-3xl mx-auto space-y-8">
      <Panel title="section-label + heading">
        <span className="section-label block">// kicker</span>
        <h2 className="heading-lg">Heading large</h2>
        <p className="text-body">Body text uses secondary tone.</p>
        <p className="text-muted">Muted support line.</p>
      </Panel>

      <Panel title="Buttons (utility classes)">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary focus-ring">
            Primary
          </button>
          <button type="button" className="btn-secondary focus-ring">
            Secondary
          </button>
          <button type="button" className="btn-ghost focus-ring">
            Ghost
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2">Prefer `&lt;Button /&gt;` in app code; this shows the CSS-level contract.</p>
      </Panel>

      <Panel title="React primitives (components/ui)">
        <TagList>
          <Badge>tag a</Badge>
          <Badge>tag b</Badge>
        </TagList>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="primary" type="button">Primary</Button>
          <Button variant="secondary" type="button">Secondary</Button>
        </div>
      </Panel>

      <Panel title="Timeline">
        <div className="relative ml-4">
          <div className="timeline-line h-20" />
          <div className="timeline-dot timeline-dot-active" />
        </div>
      </Panel>
    </div>
  ),
};
