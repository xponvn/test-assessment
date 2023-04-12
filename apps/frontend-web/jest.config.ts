/* eslint-disable */
export default {
  displayName: 'frontend-web',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageReporters: ['clover', 'json', 'lcov', 'text'],
};
