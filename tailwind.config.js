/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-red': {
          DEFAULT: '#f54322',
        },
      },
    },
  },
  plugins: [],
};
