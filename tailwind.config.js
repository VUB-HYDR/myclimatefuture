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
          DEFAULT: '#e07a5f',
          0: '#e07a5f',
          1: '#d06355',
          2: '#bc4749',
          light: '#f9efed',
          border: '#f5c82f',
          background: '#f9f0c5',
        },
      },
    },
  },
  plugins: [],
};
