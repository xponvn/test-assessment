// import * as token from './theme-token/token.json';
const { createTWConfig } = require('@test-assessment/ui-theme/createTWConfig')

module.exports = createTWConfig({ content: ['./pages/**/*.{jsx,tsx}']});
