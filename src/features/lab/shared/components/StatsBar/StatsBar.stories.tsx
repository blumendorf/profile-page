import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsBar as StatsBar } from './StatsBar';

const meta = {
  title: 'Lab/Components/StatsBar',
  component: StatsBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatsBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  args: { modelBackendLabel: 'webllm', stats: { generationTimeMs: 1200, tokenCount: 900 } },
};

export const Generating: Story = {
  args: {
    modelBackendLabel: 'webllm',
    isGenerating: true,
  },
};
