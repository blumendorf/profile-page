import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import { TagList } from './TagList';

const meta = {
  title: 'UI/Primitives/TagList',
  component: TagList,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WrappedBadges: Story = {
  args: { children: <></> },
  render: () => (
    <TagList className="max-w-56">
      {['TypeScript', 'Design systems', 'Edge runtimes', 'AI tooling'].map((t) => (
        <Badge key={t}>{t}</Badge>
      ))}
    </TagList>
  ),
};
