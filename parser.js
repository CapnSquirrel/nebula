const ohm = require('ohm-js');
const fs = require('fs');
const grammar = ohm.grammar(fs.readFileSync('./nebula.ohm'));

const withIndentsAndDedents = require('./preparser');

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  return match;
};
