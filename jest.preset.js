const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  codeCoverage: true,
  coverageReporters: ['json', 'lcov', 'text'],
};
