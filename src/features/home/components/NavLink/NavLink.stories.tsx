import type { Meta, StoryObj } from '@storybook/react-vite';
import type { MouseEvent } from 'react';
import { HomeNavLink } from './NavLink';

const meta = {
  title: 'Home/Components/NavLink',
  component: HomeNavLink,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HomeNavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
};

export const Desktop: Story = {
  args: {
    href: '#expertise',
    variant: 'desktop',
    isActive: true,
    onClick: noop,
    children: 'Expertise',
  },
};

export const Mobile: Story = {
  args: {
    href: '#expertise',
    variant: 'mobile',
    isActive: false,
    onClick: noop,
    children: 'Expertise',
  },
};
