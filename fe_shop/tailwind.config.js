const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#fff',
          text: '#000',
          primary: '#3366ff',
          secondary: '#f0f0f0',
        },
        dark: {
          background: '#111',
          text: '#fff',
          primary: '#00ccff',
          secondary: '#333',
        },
      },
    },
    screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px'
    },
  },
  plugins: [],
};
