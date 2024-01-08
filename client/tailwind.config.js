const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./controls/**/*.{html,js}",
    "./index.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        // Based on Summer Conference 2023 colors
        // Palette created with https://uicolors.app/create
        'tuscany': {
          '50': '#fcf7f0',
          '100': '#f9ebdb',
          '200': '#f1d4b7',
          '300': '#e8b789',
          '400': '#de9059',
          '500': '#d77338',
          '600': '#c65c2d',
          '700': '#a64828',
          '800': '#853b27',
          '900': '#6c3222',
          '950': '#3a1810',
        },
        'soya-bean': {
          '50': '#f5f5f1',
          '100': '#e5e5dc',
          '200': '#cecbba',
          '300': '#b1ac93',
          '400': '#9b9374',
          '500': '#8c8366',
          '600': '#786d56',
          '700': '#655a4a',
          '800': '#544a3f',
          '900': '#49413a',
          '950': '#29231f',
        },
        'porsche': {
          '50': '#fcf7ee',
          '100': '#f7e8ce',
          '200': '#eecf99',
          '300': '#e5b264',
          '400': '#e2a251',
          '500': '#d77a29',
          '600': '#be5c21',
          '700': '#9e411f',
          '800': '#81341f',
          '900': '#6a2d1d',
          '950': '#3c150c',
        },
        'pewter': {
          '50': '#f6f7f6',
          '100': '#eaeeeb',
          '200': '#d5ddd7',
          '300': '#a5b5a9',
          '400': '#8b9d8f',
          '500': '#697e6f',
          '600': '#546558',
          '700': '#445148',
          '800': '#38433b',
          '900': '#2f3832',
          '950': '#171c18',
        },
        'acapulco': {
          '50': '#f4f9f8',
          '100': '#dbece8',
          '200': '#b6d9d0',
          '300': '#7cb7ab',
          '400': '#61a095',
          '500': '#47857b',
          '600': '#376a63',
          '700': '#2f5651',
          '800': '#294643',
          '900': '#253c39',
          '950': '#112220',
        },
        'sazerac': {
          '50': '#fdf8ef',
          '100': '#faefdd',
          '200': '#f3d9b5',
          '300': '#ebbf86',
          '400': '#e39b54',
          '500': '#dc8033',
          '600': '#ce6928',
          '700': '#ab5223',
          '800': '#894223',
          '900': '#6e3820',
          '950': '#3b1a0f',
        },
      },
      screens: {
        'tall': { 'raw': '(min-height: 775px)' },
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    require('tailwind-scrollbar-hide')
  ],
}
