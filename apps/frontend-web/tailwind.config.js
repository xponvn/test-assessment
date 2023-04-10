// import * as token from './theme-token/token.json';
const { createTWConfig } = require('@test-assessment/ui-theme/src/helper');
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = createTWConfig({
  content: [
    join(__dirname, './pages/*.{jsx,tsx}'),
    join(__dirname, './pages/**/*.{jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
});
