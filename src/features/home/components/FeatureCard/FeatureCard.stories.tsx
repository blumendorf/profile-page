import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cpu } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'Home/Components/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
    title: 'Systems that scale',
    description: 'Short body copy for the card.',
    icon: Cpu,
  },
};
