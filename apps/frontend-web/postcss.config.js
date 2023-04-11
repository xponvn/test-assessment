const { createPostCssConfig } = require('@test-assessment/ui-theme/src/helper');
const { join } = require('path');

module.exports = createPostCssConfig({
  tailwindcss: {
    config: join(__dirname, 'tailwind.config.js'),
  },
});
