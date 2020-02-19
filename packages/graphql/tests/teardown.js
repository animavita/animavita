/* eslint-disable no-console */
const pkg = require('../package');

module.exports = () => {
  console.log(`# ${pkg.name.toUpperCase()} TEST TEARDOWN #`);
};
