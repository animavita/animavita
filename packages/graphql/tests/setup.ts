/* eslint-disable no-console */
const path = require('path');

const p = require('../package');

module.exports = () => {
  console.log(`\n# ${p.name.toUpperCase()} TEST SETUP #`);

  // fix dotenv-safe loading of example by setting the cwd
  process.chdir(path.resolve(path.join(__dirname, '..')));
};
