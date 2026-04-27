import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from './SectionHeader';

const meta = {
  title: 'Home/Components/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[40rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border-subtle bg-page p-8 text-text-primary">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    kicker: '// section',
    title: 'Section title',
    subheading: 'A short supporting line in muted text.',
  },
};

export const TitleSpacing: Story = {
  args: {
    kicker: '// journey',
    title: 'Journey',
    titleSpacingClassName: 'mb-12',
  },
};

export const WithIntro: Story = {
  args: {
    kicker: '// lab',
    title: 'The Lab',
    titleSpacingClassName: 'mb-6',
    intro: <p className="text-body mb-8 max-w-2xl">Custom intro with body styling.</p>,
  },
};
