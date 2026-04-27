import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabInfoPanel as InfoPanel } from './LabInfoPanel';

const meta = {
  title: 'Lab/Components/InfoPanel',
  component: InfoPanel,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[36rem] max-w-[calc(100vw-2rem)] rounded-lg bg-surface p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tip: Story = {
  args: {
    children: (
      <>
        <strong className="text-text-primary">Tip:</strong> Tune temperature and max tokens for best results.
      </>
    ),
  },
};
