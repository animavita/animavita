const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  testPathIgnorePatterns: ['/node_modules/', './build'],
  coverageReporters: ['lcov', 'html'],
  globalSetup: '<rootDir>/tests/setup.ts',
  globalTeardown: '<rootDir>/tests/teardown.ts',
  testEnvironment: '<rootDir>/tests/environment/mongodb.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTestFramework.ts'],
  resetModules: false,
  reporters: ['default'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': '<rootDir>/tests/babel.transformer.ts',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
};
