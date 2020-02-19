/* eslint-disable no-console */
const path = require('path');

const pkg = require('../package');

module.exports = () => {
  console.log(`\n# ${pkg.name.toUpperCase()} TEST SETUP #`);

  // fix dotenv-safe loading of example by setting the cwd
  process.chdir(path.resolve(path.join(__dirname, '..')));
};
