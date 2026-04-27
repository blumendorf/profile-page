import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabStatusDot as StatusDot } from './LabStatusDot';

const meta = {
  title: 'Lab/Components/StatusDot',
  component: StatusDot,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = { args: { status: 'ready' } };
export const Loading: Story = { args: { status: 'loading' } };
