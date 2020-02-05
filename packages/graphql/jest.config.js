const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testPathIgnorePatterns: ['/node_modules/', './build'],
  coverageReporters: ['lcov', 'html'],
  globalSetup: '<rootDir>/tests/setup.js',
  globalTeardown: '<rootDir>/tests/teardown.js',
  testEnvironment: '<rootDir>/tests/environment/mongodb',
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/tests/babel.transformer',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
