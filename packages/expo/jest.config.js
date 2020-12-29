const pkg = require('./package');

module.exports = {
  rootDir: './',
  name: pkg.name,
  displayName: pkg.name.toUpperCase(),
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./tests/setup.ts'],
};
