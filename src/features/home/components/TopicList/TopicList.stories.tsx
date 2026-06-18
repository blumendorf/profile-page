import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopicList } from './TopicList';

const meta = {
  title: 'Home/Components/TopicList',
  component: TopicList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TopicList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    topics: ['TypeScript', 'Design systems', 'Edge runtimes'],
  },
  render: (args) => (
    <div className="w-[28rem] p-6 rounded-lg border border-border-subtle bg-surface/40">
      <TopicList {...args} />
    </div>
  ),
};
