/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Use CSS variables for theme-aware colors
        'page': 'var(--bg-page)',
        'card': 'var(--bg-card)',
        'surface': 'var(--bg-surface)',
        'accent': {
          DEFAULT: 'var(--accent-primary)',
          glow: 'var(--accent-glow)',
          secondary: 'var(--accent-secondary)',
        },
        'text': {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        'border': {
          subtle: 'var(--border-subtle)',
          active: 'var(--border-active)',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'heading': '-0.02em',
        'subheading': '-0.01em',
      },
      lineHeight: {
        'relaxed': '1.6',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
