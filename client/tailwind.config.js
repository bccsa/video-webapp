const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./controls/**/*.{html,js}",
    "./index.{html,js}",
  ],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(min-height: 775px)' },
      }
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require('tailwind-scrollbar-hide')
  ],
}
