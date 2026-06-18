import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileAvatar } from './ProfileAvatar';

const meta = {
  title: 'Home/Components/ProfileAvatar',
  component: ProfileAvatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: false },
    sizeClassName: { control: false },
  },
} satisfies Meta<typeof ProfileAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageSrc: `${import.meta.env.BASE_URL}marco-small.jpg`,
    imageAlt: 'Profile photo',
  },
  render: (args) => (
    <div className="p-8 bg-page">
      <ProfileAvatar {...args} />
    </div>
  ),
};
