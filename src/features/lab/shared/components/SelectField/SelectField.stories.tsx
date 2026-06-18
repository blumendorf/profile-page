import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectField as SelectField } from './SelectField';

const meta = {
  title: 'Lab/Components/SelectField',
  component: SelectField,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectHarness = (args: ComponentProps<typeof SelectField>) => {
  const [v, setV] = useState('a');
  return (
    <div className="max-w-sm p-4">
      <SelectField {...args} value={v} onChange={setV} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SelectHarness {...args} />,
  args: {
    label: 'Option',
    value: 'a',
    onChange: () => {},
    options: [
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Bravo' },
    ],
  },
};
