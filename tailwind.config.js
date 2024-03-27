/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Fira Sans', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          0: 'rgb(var(--color-accent-0) / <alpha-value>)',
          1: 'rgb(var(--color-accent-1) / <alpha-value>)',
          2: 'rgb(var(--color-accent-2) / <alpha-value>)',
          light: '#f9efed',
          border: '#f5c82f',
          background: '#f9f0c5',
        },
        primary: {
          DEFAULT: '#3d405b',
          light: 'rgba(61, 64, 91, 0.2)',
        },
        secondary: '#798094',
        tertiary: '#e0e0e0',
      },
    },
  },
  plugins: [],
};
