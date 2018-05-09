// const requireDir = (directory) => {
//   const normalizedPath = require('path').join(__dirname, directory);
//   const exports = {};
//   require('fs')
//     .readdirSync(normalizedPath)
//     .forEach((file) => {
//       const item = require(`./${directory}/${file}`);
//       exports[item.name] = item;
//     });
//   return exports;
// };
//
// module.exports = requireDir('.');
/* eslint-disable global-require, import/no-dynamic-require */
module.exports = {
  Access: require('./Access'),
  Accessor: require('./Accessor'),
  Argument: require('./Argument'),
  BooleanLiteral: require('./BooleanLiteral'),
  Condition: require('./Condition'),
  Conditional: require('./Conditional'),
  Control: require('./Control'),
  Coordinate: require('./Coordinate'),
  Evaluate: require('./Evaluate'),
  Function: require('./Function'),
  Initialize: require('./Initialize'),
  Link: require('./Link'),
  Location: require('./Location'),
  NumericLiteral: require('./NumericLiteral'),
  Origin: require('./Origin'),
  Parameter: require('./Parameter'),
  Program: require('./Program'),
  Result: require('./Result'),
  Return: require('./Return'),
  SetParameter: require('./SetParameter'),
  StringLiteral: require('./StringLiteral'),
};
/* eslint-enable global-require, import/no-dynamic-require */
