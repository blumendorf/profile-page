import type { Meta, StoryObj } from '@storybook/react-vite';
import { Zap } from 'lucide-react';
import { LabEmptyState as EmptyState } from './LabEmptyState';

const meta = {
  title: 'Lab/Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Zap className="w-8 h-8 text-cyan-500" />,
    title: 'Select a Model',
    description: 'Choose a model to continue.',
    footnote: 'First load can be large.',
  },
};
