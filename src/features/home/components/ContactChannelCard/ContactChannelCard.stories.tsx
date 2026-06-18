import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { ContactChannelCard } from './ContactChannelCard';

const meta = {
  title: 'Home/Components/ContactChannelCard',
  component: ContactChannelCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-96 max-w-[calc(100vw-2rem)] rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactChannelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    href: '#',
    icon: Mail,
    channel: {
      type: 'email',
      label: 'Email',
      description: 'Best for thoughtful notes',
    },
  },
};
