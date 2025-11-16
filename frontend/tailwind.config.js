/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#6366F1',
          dark: '#818CF8',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E1E2F',
        },
        card: {
          light: '#FFFFFF',
          dark: '#26263A',
        },
        border: {
          light: '#E5E7EB',
          dark: '#3B3B4F',
        },
        text: {
          light: '#111827',
          dark: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
};

