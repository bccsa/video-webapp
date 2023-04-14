const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../client/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Iconify plugin
		addDynamicIconSelectors(),
  ],
}
