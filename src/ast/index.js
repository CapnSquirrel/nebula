// /* eslint-disable global-require, import/no-dynamic-require */
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
// /* eslint-enable global-require, import/no-dynamic-require */
//
// module.exports = requireDir('.');

import Access from './Access';
import Accessor from './Accessor';
import Argument from './Argument';
import BooleanLiteral from './BooleanLiteral';
import Condition from './Condition';
import Conditional from './Conditional';
import Control from './Control';
import Coordinate from './Coordinate';
import Evaluate from './Evaluate';
import Function from './Function';
import Initialize from './Initialize';
import Link from './Link';
import Location from './Location';
import NumericLiteral from './NumericLiteral';
import Origin from './Origin';
import Parameter from './Parameter';
import Program from './Program';
import Result from './Result';
import Return from './Return';
import SetParameter from './SetParameter';
import StringLiteral from './StringLiteral';

export {
  Access,
  Accessor,
  Argument,
  BooleanLiteral,
  Condition,
  Conditional,
  Control,
  Coordinate,
  Evaluate,
  Function,
  Initialize,
  Link,
  Location,
  NumericLiteral,
  Origin,
  Parameter,
  Program,
  Result,
  Return,
  SetParameter,
  StringLiteral,
};
