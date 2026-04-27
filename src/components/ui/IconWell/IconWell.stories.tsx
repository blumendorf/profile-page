import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { IconWell } from './IconWell';

const meta = {
  title: 'UI/Primitives/IconWell',
  component: IconWell,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconWell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'icon' },
  render: () => (
    <IconWell>
      <Mail className="w-5 h-5 text-accent" />
    </IconWell>
  ),
};

export const ContactEmail: Story = {
  args: { children: 'icon' },
  render: () => (
    <IconWell variant="contactEmail">
      <Mail size={20} />
    </IconWell>
  ),
};

export const ContactExternal: Story = {
  args: { children: 'icon' },
  render: () => (
    <IconWell variant="contactExternal">
      <Mail size={20} />
    </IconWell>
  ),
};
