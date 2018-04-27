const fs = require('fs');
const ohm = require('ohm-js');
const withIndentsAndDedents = require('./preparser');

const {
  Program,
  Origin,
  Argument,
  Result,
  Function,
  Parameter,
  Return,
  Conditional,
  Condition,
  Link,
  Control,
  Accessor,
  SetParameter,
  Initialize,
  Access,
  Evaluate,
  Location,
  Coordinate,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
} = require('../ast');

const grammar = ohm.grammar(fs.readFileSync('./syntax/nebula.ohm'));

/* eslint-disable no-unused-vars */
/* eslint-disable no-new-func */
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program: (_1, body, _2, _3) =>
    new Program(body.ast()),
  Origin: (_1, def, id, location, _2, body) =>
    new Origin(!!def, id.ast(), location.ast(), body.ast()),
  OriginBlock: (_1, args, result, _2) =>
    [...args.ast(), result.ast()],
  Argument: (_1, type, id, location, _2) =>
    new Argument(type.sourceString, id.ast(), location.ast()),
  Result: (_1, type, location, _2, _3, body, control, _4) =>
    new Result(type.sourceString, location.ast(), body.ast(), control.ast()),
  Function: (_1, id, location, _2, body) =>
    new Function(id.ast(), location.ast(), body.ast()),
  FunctionBlock: (_1, params, _return, _2) =>
    [...params.ast(), _return.ast()],
  Parameter: (_1, id, location, _2, _3, body, _5) =>
    new Parameter(id.ast(), location.ast(), body.ast()),
  Return: (_1, location, _2, _3, control, _4) =>
    new Return(location.ast(), control.ast()),
  Initialize: (_1, type, value, _2) =>
    new Initialize(type.sourceString, value.ast()),
  Access: (_1, id, type, _2) =>
    new Access(type.sourceString, id.ast()),
  Evaluate: (_1, expr, _2) =>
    new Evaluate(expr.ast()),
  Conditional: (_1, location, _2, _3, condition, trueControl, falseControl, _4) =>
    new Conditional(location.ast(), condition.ast(), trueControl.ast(), falseControl.ast()),
  Condition: (_1, _2, location, _3, _4, body, _5) =>
    new Condition(location.ast(), body.ast()),
  TrueControl: (_1, _2, location, _3) =>
    new Control(location.ast()),
  FalseControl: (_1, _2, location, _3) =>
    new Control(location.ast()),
  Accessor: (_1, id, location, _2, body) =>
    new Accessor(id.ast(), location.ast(), body.ast()),
  AccessorBlock: (_1, body, control, _2) =>
    (body.length ? [...body.ast(), control.ast()] : [body.ast(), control.ast()]),
  SetParameter: (_1, _2, type, location, _3) =>
    new SetParameter(type.sourceString, location.ast()),
  Link: (_, fromLocation, toLocation) =>
    new Link(fromLocation.ast(), toLocation.ast()),
  Control: (_1, location, _3) =>
    new Control(location.ast()),
  Location: (_, coord, brace) =>
    new Location(brace.sourceString === ')', coord.ast()),
  Coordinate: args =>
    new Coordinate(args.ast()),
  NonemptyListOf: (first, _, rest) =>
    [first.ast(), ...rest.ast()],
  type(_1) {
    return new StringLiteral(this.sourceString);
  },
  strlit(_1, _2, _3) {
    return new StringLiteral(this.sourceString);
  },
  numlit(_1, _2, _3, _4) {
    return new NumericLiteral(+this.sourceString);
  },
  boollit(_1) {
    return new BooleanLiteral(!!this.sourceString);
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
