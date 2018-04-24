/* eslint-disable global-require, import/no-dynamic-require */
const requireDir = (directory) => {
  const normalizedPath = require('path').join(__dirname, directory);
  const exports = {};
  require('fs')
    .readdirSync(normalizedPath)
    .forEach((file) => {
      const item = require(`./${directory}/${file}`);
      exports[item.name] = item;
    });
  return exports;
};
/* eslint-enable global-require, import/no-dynamic-require */

module.exports = requireDir('.');
