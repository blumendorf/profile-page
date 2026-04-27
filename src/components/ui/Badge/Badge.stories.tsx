import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'UI/Primitives/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { children: 'Label' },
};

export const LongLabel: Story = {
  args: { children: 'Longer badge label' },
};
