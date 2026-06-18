import type { Meta, StoryObj } from '@storybook/react-vite';
import { SeriesNav } from './SeriesNav';
import { designAndAiSeries, seriesLength } from '../parts';

const meta = {
  title: 'Lab/DesignAndAi/SeriesNav',
  component: SeriesNav,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="bg-page text-text-primary p-6 max-w-3xl mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SeriesNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompactMidSeries: Story = {
  args: {
    previous: designAndAiSeries[1],
    next: designAndAiSeries[3],
    currentPart: 3,
    totalParts: seriesLength,
    variant: 'compact',
  },
};

export const CompactFirstPart: Story = {
  args: {
    previous: undefined,
    next: designAndAiSeries[1],
    currentPart: 1,
    totalParts: seriesLength,
    variant: 'compact',
  },
};

export const CompactLastPart: Story = {
  args: {
    previous: designAndAiSeries[5],
    next: undefined,
    currentPart: 7,
    totalParts: seriesLength,
    variant: 'compact',
  },
};

export const CardsMidSeries: Story = {
  args: {
    previous: designAndAiSeries[1],
    next: designAndAiSeries[3],
    currentPart: 3,
    totalParts: seriesLength,
    variant: 'cards',
  },
};

export const CardsLastPart: Story = {
  args: {
    previous: designAndAiSeries[5],
    next: undefined,
    currentPart: 7,
    totalParts: seriesLength,
    variant: 'cards',
  },
};
