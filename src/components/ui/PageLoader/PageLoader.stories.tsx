import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLoader } from './PageLoader';

const meta = {
  title: 'UI/App Visuals/PageLoader',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-page">
      <PageLoader />
    </div>
  ),
};
