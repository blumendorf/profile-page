import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill as Pill } from './Pill';

const meta = {
  title: 'Lab/Components/Pill',
  component: Pill,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'WebGPU' },
};
