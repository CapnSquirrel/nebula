const tokens = require('./test-data/recursive-fib.js');
const modules = require('./default-modules');

const idMap = {};

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
      if (v.id) idMap[v.id] = v;
    }
    return `${v.type}_${map.get(v)}`;
  };
})();

// const createOriginFunction = ;

const getArg = item => (arg) => {
  const param = item.params[arg];
  switch (typeof param) {
    case 'string':
      return `"${param}"`;
    case 'object':
      return `${jsName(param)}()`;
    default:
      return param;
  }
};

const useModule = (item) => {
  const mod = modules.all[item.funct];
  return `${mod.funct}(${mod.order.map(getArg(item)).join(', ')})`;
};

const getStrVersion = (item) => {
  if (item.type === 'Function') {
    return `() => ${idMap[item.funct] || useModule(item)}`; // requires module Implementation
  }
  if (item.type === 'Origin') {
    return `() => ${getArg(item)('result')}`;
  }
  if (item.type === 'Accessor') {
    return ''; // not implemented yet
  }
  return '';
};

const defArgs = []; // populated by function
const strVars = `let ${tokens.map(jsName).join(', ')};`;
const funs = tokens.map(item => `${jsName(item)} = ${getStrVersion(item)};`).join('\n');
const defEval = tokens
  .filter(item => item.type === 'Origin' && item.default)
  .map(item => `${jsName(item)}(${defArgs.join(',')})`)
  .join('\n');
const exps = tokens
  .filter(item => item.type === 'Origin')
  .map(item => `module.exports.${item.id} = ${jsName(item)};`)
  .join('\n');
const defaultExp = tokens
  .filter(item => item.type === 'Origin' && item.default)
  .map(item => `module.exports.default = ${jsName(item)};`)
  .join('\n');

module.exports = {
  createExports() {
    console.log(strVars);
    console.log(funs);
    console.log(exps);
    console.log(defaultExp);
  },

  runProgram() {
    console.log(strVars);
    console.log(funs);
    console.log(defEval);
  },
};
