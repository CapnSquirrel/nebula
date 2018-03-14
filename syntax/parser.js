const ohm = require('ohm-js');
const fs = require('fs');
const grammar = ohm.grammar(fs.readFileSync('./syntax/nebula.ohm'));

const Program = require('../ast/program');
const Object = require('../ast/object');
const Origin = require('../ast/Origin');
const Result = require('../ast/link');
const Link = require('../ast/link');
const accessor = require('../ast/accessor');
const function = require('../ast/function');
const conditional = require('../ast/conditional');
const parameter = require('../ast/parameter');
const control = require('../ast/control');
const return = require('../ast/return');
const yield = require('../ast/yield');
const error = require('../ast/error');
const primitive = require('../ast/primitive');
const id = require('../ast/id');
const access = require('../ast/access');
const initialize = require('../ast/initialize');

const withIndentsAndDedents = require('./preparser');

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  return match;
};
