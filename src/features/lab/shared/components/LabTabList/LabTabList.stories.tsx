import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eye, Code, Terminal } from 'lucide-react';
import { LabTabList as TabList } from './LabTabList';

const meta = {
  title: 'Lab/Components/TabList',
  component: TabList,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabHarness = () => {
  const [active, setActive] = useState<'a' | 'b' | 'c'>('a');
  return (
    <div className="p-4 bg-page">
      <TabList
        active={active}
        onChange={setActive}
        tabs={[
          { id: 'a', label: 'Preview', icon: Eye },
          { id: 'b', label: 'Code', icon: Code },
          { id: 'c', label: 'Logs', icon: Terminal, suffix: <span className="text-xs opacity-60">(3)</span> },
        ]}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    tabs: [
      { id: 'a', label: 'Preview', icon: Eye },
      { id: 'b', label: 'Code', icon: Code },
      { id: 'c', label: 'Logs', icon: Terminal, suffix: <span className="text-xs opacity-60">(3)</span> },
    ],
    active: 'a',
    onChange: () => {},
  },
  render: () => <TabHarness />,
};
