const print = {
  args: { message: 'any' },
  returns: 'void',
  eval: 'console.log(#{message})',
};

const ternary = {
  args: { condition: 'boolean', true: 'any', false: 'any' },
  returns: 'any',
  eval: '#{condition} ? #{true} : #{false}',
};

const add = {
  args: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} + #{p2}',
};

const subtract = {
  args: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} - #{p2}',
};

const multiply = {
  args: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} * #{p2}',
};

const divide = {
  args: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} / #{p2}',
};

const modulo = {
  args: { p1: 'number', p2: 'number' },
  returns: 'number',
  eval: '#{p1} % #{p2}',
};

const lessThan = {
  args: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} < #{p2}',
};

const lessThanOrEqual = {
  args: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} <= #{p2}',
};

const greaterThan = {
  args: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} > #{p2}',
};

const greaterThanOrEqual = {
  args: { p1: 'number', p2: 'number' },
  returns: 'boolean',
  eval: '#{p1} >= #{p2}',
};

const equal = {
  args: { p1: 'number', p2: 'number' },
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
