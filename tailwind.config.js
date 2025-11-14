/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme-red': {
          DEFAULT: '#FF3008',
        },
        'doordash': {
          red: '#FF3008',
          dark: '#191919',
          gray: '#696969',
          'light-gray': '#F7F7F7',
        },
      },
    },
  },
  plugins: [],
};
