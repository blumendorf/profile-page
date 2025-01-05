/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#535bf2',
        accent: 'rgb(4, 170, 0)',
        'accent-dark': 'rgb(3, 140, 0)',
        'accent-light': 'rgb(5, 200, 0)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}