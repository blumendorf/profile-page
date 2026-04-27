import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShineCard } from './index';

const meta = {
  title: 'UI/Primitives/ShineCard',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-page p-8">
      <div className="max-w-md">
        <ShineCard className="p-6">
          <h2 className="heading-md mb-3">Shine Card</h2>
          <p className="text-muted">
            A reusable elevated card with an interactive border highlight.
          </p>
        </ShineCard>
      </div>
    </div>
  ),
};
