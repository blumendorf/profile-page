import type { Meta, StoryObj } from '@storybook/react-vite';
import { BackLink as BackLink } from './BackLink';

const meta = {
  title: 'Lab/Components/BackLink',
  component: BackLink,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToLab: Story = {
  args: {
    children: 'Back to lab',
    className: 'mb-4',
  },
};

export const CyanHover: Story = {
  args: {
    children: 'Back to Lab',
    display: 'flex',
    hoverAccentClassName: 'hover:text-cyan-500',
  },
};
