import type { Meta, StoryObj } from '@storybook/react-vite';
import { JsonView } from './index';

const meta = {
  title: 'UI/App Visuals/JsonView',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <JsonView />,
};

export const FocusedExpertise: Story = {
  render: () => <JsonView focusedSection="expertise" />,
};
