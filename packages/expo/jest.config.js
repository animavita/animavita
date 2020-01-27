const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  preset: 'jest-expo',
  browser: false,
  setupFilesAfterEnv: ['./tests/setup.ts'],
};
