import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { JsonModeToggle } from './JsonModeToggle';

const meta = {
  title: 'Home/Components/JsonModeToggle',
  component: JsonModeToggle,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="rounded-lg bg-page p-6 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof JsonModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stateful = (args: ComponentProps<typeof JsonModeToggle>) => {
  const [on, setOn] = useState(false);
  return <JsonModeToggle {...args} isJsonMode={on} onClick={() => setOn((v) => !v)} />;
};

export const Default: Story = {
  args: { isJsonMode: false, onClick: () => {} },
  render: (args) => <Stateful {...args} />,
};

export const Compact: Story = {
  args: { isJsonMode: false, onClick: () => {}, size: 'compact' },
  render: (args) => <Stateful {...args} />,
};
