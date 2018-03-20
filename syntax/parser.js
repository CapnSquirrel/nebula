const fs = require('fs');
const ohm = require('ohm-js');
const withIndentsAndDedents = require('./preparser');

const {
  Program,
  Constructs,
  Traits,
  Location,
  Coordinate,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  IdLiteral,
} = require('../ast');

const grammar = ohm.grammar(fs.readFileSync('./syntax/nebula.ohm'));

const format = (label) => {
  const s = label.ast();
  return s[0].toUpperCase() + s.substring(1);
};

/* eslint-disable no-unused-vars */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program: body => new Program(body.ast()),
  Construct: (label, args, locations, _, body) =>
    new Constructs[(format(label))](args.ast(), locations.ast(), body.ast()),
  Trait: (label, args, _, body) => new Traits[(format(label))](args.ast(), body.ast()),
  Block: (_1, body, _2, _3) => body.ast(),
  Argument: arg => arg.ast(),
  Location: (_, coord, brace) => new Location(brace.sourceString === ')', coord.ast()),
  Coordinate: args => new Coordinate(args.ast()),
  NonemptyListOf: (first, _, rest) => [first.ast(), ...rest.ast()],

  strlit(_1, _2, _3) {
    return new StringLiteral(this.sourceString);
  },
  numlit(_1, _2, _3, _4) {
    return new NumericLiteral(+this.sourceString);
  },
  boollit(_1) {
    return new BooleanLiteral(this.sourceString);
  },
  id(_1, _2) {
    return new IdLiteral(this.sourceString);
  },
  _terminal() {
    return this.sourceString;
  },
});
/* eslint-enable no-unused-vars */

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return astGenerator(match).ast();
};
