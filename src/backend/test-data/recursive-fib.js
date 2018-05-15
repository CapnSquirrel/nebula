const n = { type: 'Variable', id: 'n' };

const minus1 = {
  type: 'Function',
  funct: 'subtract',
  params: { p1: n, p2: 1 },
};

const minus2 = {
  type: 'Function',
  funct: 'subtract',
  params: { p1: n, p2: 2 },
};

const fib1 = {
  type: 'Function',
  funct: 'fib',
  params: { n: minus1 },
};

const fib2 = {
  type: 'Function',
  funct: 'fib',
  params: { n: minus2 },
};

const plus = {
  type: 'Function',
  funct: 'add',
  params: { p1: fib1, p2: fib2 },
};

const lessThanOrEqual = {
  type: 'Function',
  funct: 'lessThanOrEqual',
  params: { p1: n, p2: 1 },
};

const ternary = {
  type: 'Function',
  funct: 'ternary',
  params: { true: n, false: plus, condition: lessThanOrEqual },
};

const origin = {
  type: 'Origin',
  default: true,
  id: 'fib',
  result: ternary,
  args: { n: 'number' },
  returns: 'number',
};

export default [origin, ternary, lessThanOrEqual, plus, fib1, minus1, fib2, minus2];
