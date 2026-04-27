import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabPill as Pill } from './LabPill';

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
