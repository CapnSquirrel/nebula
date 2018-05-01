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

const createOriginFunction = item => `(ctx) => ${jsName(item.result)}(ctx)`;

const getArg = item => (arg) => {
  if (item.type === 'Variable') return `ctx['${item.id}']`;
  const param = item.params[arg];
  switch (typeof param) {
    case 'string':
      return `"${param}"`;
    case 'object':
      return param.type === 'Variable' ? `ctx['${param.id}']` : `${jsName(param)}(ctx)`;
    default:
      return param;
  }
};

const useModule = (item) => {
  const mod = modules.all[item.funct];
  return mod.eval.replace(/#\{([^}]*)\}/g, (_, s) => getArg(item)(s));
};

const getStrVersion = (item) => {
  if (item.type === 'Function') {
    const other = idMap[item.funct];
    if (other) {
      const paramsStr = Object.keys(item.params)
        .map(key => `'${key}': ${getArg(item)(key)}`)
        .join(', ');
      return `(ctx) => ${jsName(other)}({...ctx, ...{${paramsStr}}})`;
    }
    return `(ctx) => ${useModule(item)}`;
  }
  if (item.type === 'Origin') {
    return createOriginFunction(item);
  }
  if (item.type === 'Accessor') {
    return ''; // not implemented yet
  }
  return '';
};

const strVars = `let ${tokens.map(jsName).join(', ')};`;
const funs = tokens.map(item => `${jsName(item)} = ${getStrVersion(item)};`).join('\n');

module.exports = {
  createExports() {
    console.log(strVars);
    console.log(funs);
    const exps = tokens
      .filter(item => item.type === 'Origin')
      .map(item => `module.exports['${item.id}'] = ${jsName(item)};`)
      .join('\n');
    const defaultExp = tokens
      .filter(item => item.type === 'Origin' && item.default)
      .map(item => `module.exports.default = ${jsName(item)};`)
      .join('\n');
    console.log(exps);
    console.log(defaultExp);
  },

  runProgram(args, print) {
    console.log(strVars);
    console.log(funs);
    const objStr = Object.keys(args)
      .map(key => `'${key}': ${args[key]}`)
      .join(', ');
    const defEval = tokens
      .filter(item => item.type === 'Origin' && item.default)
      .map(item => `${jsName(item)}({${objStr}})`)
      .join('\n');
    console.log(print ? `console.log(${defEval})` : `${defEval}`);
  },
};
