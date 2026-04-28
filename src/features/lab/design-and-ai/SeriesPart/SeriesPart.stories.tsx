import type { Meta, StoryObj } from '@storybook/react-vite';
import { SeriesPart } from './SeriesPart';

const meta = {
  title: 'Lab/DesignAndAi/SeriesPart',
  component: SeriesPart,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SeriesPart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Intro: Story = {
  args: { partNumber: 1 },
};

export const DesignMd: Story = {
  args: { partNumber: 2 },
};

export const Storybook: Story = {
  args: { partNumber: 3 },
};

export const ComponentsAndTokens: Story = {
  args: { partNumber: 4 },
};

export const FigmaJobs: Story = {
  args: { partNumber: 5 },
};

export const Tools: Story = {
  args: { partNumber: 6 },
};

export const Workflow: Story = {
  args: { partNumber: 7 },
};
