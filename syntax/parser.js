const ohm = require('ohm-js');
const fs = require('fs');
const grammar = ohm.grammar(fs.readFileSync('./syntax/nebula.ohm'));

const Program = require('../ast/program');
const Object = require('../ast/object');
const Origin = require('../ast/Origin');
const Result = require('../ast/link');
const Link = require('../ast/link');
const Accessor = require('../ast/accessor');
const Function = require('../ast/function');
const Conditional = require('../ast/conditional');
const Parameter = require('../ast/parameter');
const caseontrol = require('../ast/control');
const Return = require('../ast/return');
const Yield = require('../ast/yield');
const Error = require('../ast/error');
const Primitive = require('../ast/primitive');
const Id = require('../ast/id');
const Access = require('../ast/access');
const Initialize = require('../ast/initialize');

const withIndentsAndDedents = require('./preparser');

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  return match;
};
