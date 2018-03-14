const Program = require('./Program.js');
const Construct = require('./Construct.js');
const Trait = require('./Trait.js');
const Location = require('./Location.js');
const Coordinate = require('./Coordinate.js');

/* eslint-disable */
const requireDir = directory => {
  const normalizedPath = require('path').join(__dirname, directory);
  const exports = {};
  require('fs')
    .readdirSync(normalizedPath)
    .forEach(file => {
      const item = require(`./${directory}/${file}`);
      exports[item.name] = item;
    });
  return exports;
};

const Constructs = requireDir('constructs');
const Traits = requireDir('traits');

module.exports = {
  Program,
  Construct,
  Constructs,
  Trait,
  Traits,
  Location,
  Coordinate,
};
