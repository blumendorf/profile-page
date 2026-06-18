import type { Decorator, Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css';

const withTheme: Decorator = (Story) => (
  <div className="dark scroll-smooth min-h-screen bg-page text-text-primary">
    <Story />
  </div>
);

const withRouter: Decorator = (Story) => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
);

const preview: Preview = {
  decorators: [withTheme, withRouter],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // WCAG2AA is a sensible default; stories can override
      test: 'error',
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
};

export default preview;
