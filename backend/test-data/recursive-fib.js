let [origin, ternary, lessThanOrEqual, plus, fib1, minus1, fib2, minus2] = [];

origin = {
  type: 'Origin',
  default: true,
  id: 'fib',
  result: ternary,
  args: { n: 'number' },
  returns: 'number',
};

ternary = {
  type: 'Function',
  funct: 'ternary',
  params: { true: '#{n}', false: plus, condition: '' },
};

lessThanOrEqual = {
  type: 'Function',
  funct: 'lessThanOrEqual',
  params: { p1: '#{n}', p2: 1 },
};

plus = {
  type: 'Function',
  funct: 'plus',
  params: { p1: fib1, p2: fib2 },
};

fib1 = {
  type: 'Function',
  funct: 'fib1',
  params: { n: minus1 },
};

minus1 = {
  type: 'Function',
  funct: 'minus1',
  params: { p1: '#{n}', p2: 1 },
};

fib2 = {
  type: 'Function',
  funct: 'fib2',
  params: { n: minus2 },
};

minus2 = {
  type: 'Function',
  funct: 'minus2',
  params: { p1: '#{n}', p2: 2 },
};

module.exports = [origin, ternary, lessThanOrEqual, plus, fib1, minus1, fib2, minus2];
