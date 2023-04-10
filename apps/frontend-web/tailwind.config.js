// import * as token from './theme-token/token.json';
const { createTWConfig, getToken } = require('@test-assessment/ui-theme/createTWConfig')

console.log("getToken:", getToken)
module.exports = createTWConfig({ content: ['./pages/**/*.{jsx,tsx}'] });
