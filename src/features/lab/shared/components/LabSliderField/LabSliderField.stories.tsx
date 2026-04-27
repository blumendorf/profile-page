import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabSliderField as SliderField } from './LabSliderField';

const meta = {
  title: 'Lab/Components/SliderField',
  component: SliderField,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SliderField>;

export default meta;
type Story = StoryObj<typeof meta>;

const Harness = (args: ComponentProps<typeof SliderField>) => {
  const [v, setV] = useState(400);
  return <SliderField {...args} value={v} onChange={setV} />;
};

export const Default: Story = {
  render: (args) => <Harness {...args} />,
  args: {
    label: 'Max tokens',
    value: 400,
    onChange: () => {},
    min: 100,
    max: 800,
  },
};
