const print = {
  params: { message: 'string' },
  returns: 'void',
  funct: 'console.log',
  order: ['message'],
};

const ternary = {
  params: { condition: 'boolean', true: 'any', false: 'any' },
  returns: 'any',
  eval: '#{condition} ? #{true} : #{false}',
};

const add = {
  params: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} + #{p2}',
};

const subtract = {
  params: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} - #{p2}',
};

const multiply = {
  params: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} * #{p2}',
};

const divide = {
  params: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} / #{p2}',
};

const modulo = {
  params: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} % #{p2}',
};

const lessThan = {
  params: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} < #{p2}',
};

const lessThanOrEqual = {
  params: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} <= #{p2}',
};

const greaterThan = {
  params: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} > #{p2}',
};

const greaterThanOrEqual = {
  params: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} >= #{p2}',
};

const equal = {
  params: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} === #{p2}',
};

module.exports = {
  print,
  ternary,
  add,
  subtract,
  multiply,
  divide,
  modulo,
  lessThan,
  lessThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
  equal,
};
