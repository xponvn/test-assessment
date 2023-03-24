/** @type {import('tailwindcss').Config} */

import { tokens } from '@test-assessment/design-token';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: tokens.colors
  },
  plugins: []
};
