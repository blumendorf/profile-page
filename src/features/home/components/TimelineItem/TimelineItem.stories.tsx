import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimelineItem } from './TimelineItem';

const meta = {
  title: 'Home/Components/TimelineItem',
  component: TimelineItem,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TimelineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0,
    title: 'Chapter title',
    period: '2020 — Present',
    description: 'What happened in this period.',
  },
  decorators: [
    (Story) => (
      <div className="relative ml-6 min-h-32 w-96 max-w-[calc(100vw-2rem)] rounded-lg bg-page p-4 text-text-primary">
        <div className="timeline-line" />
        <Story />
      </div>
    ),
  ],
};

export const Current: Story = {
  args: {
    index: 0,
    title: 'Now',
    period: '2025',
    description: 'The active chapter.',
    isCurrent: true,
  },
  decorators: [
    (Story) => (
      <div className="relative ml-6 min-h-32 w-96 max-w-[calc(100vw-2rem)] rounded-lg bg-page p-4 text-text-primary">
        <div className="timeline-line" />
        <Story />
      </div>
    ),
  ],
};
