import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code2 } from 'lucide-react';
import { LabExperimentCard as ExperimentCard } from './LabExperimentCard';

const meta = {
  title: 'Lab/Components/ExperimentCard',
  component: ExperimentCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-[calc(100vw-2rem)] rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExperimentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  args: {
    title: 'Browser AI: HTML',
    description: 'Run an LLM in the browser to generate layout.',
    icon: <Code2 size={24} className="text-cyan-500" />,
    href: '/lab/html',
    accentColor: 'bg-cyan-500/20',
    tag: 'WebGPU',
  },
};

export const External: Story = {
  args: {
    title: 'Docs',
    description: 'Read more.',
    icon: <Code2 size={24} />,
    href: 'https://example.com',
    accentColor: 'bg-amber-500/20',
    isExternal: true,
  },
};
