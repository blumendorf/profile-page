import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorPanel as ErrorPanel } from './ErrorPanel';

const meta = {
  title: 'Lab/Components/ErrorPanel',
  component: ErrorPanel,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[36rem] max-w-[calc(100vw-2rem)] rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ErrorPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { message: 'Generation failed: timeout' },
};
