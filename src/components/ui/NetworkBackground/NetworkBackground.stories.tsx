import type { Meta, StoryObj } from '@storybook/react-vite';
import { NetworkBackground } from './index';

const meta = {
  title: 'UI/App Visuals/NetworkBackground',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="relative min-h-screen bg-page overflow-hidden">
      <NetworkBackground nodeCount={32} connectionDistance={140} />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8 text-center">
        <div>
          <p className="section-label mb-4">// network background</p>
          <h1 className="heading-lg">Ambient canvas layer</h1>
        </div>
      </div>
    </div>
  ),
};
