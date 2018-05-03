module.exports = {
  print: {
    args: { message: 'any' },
    returns: 'void',
    eval: "console.log(#{message} + '')",
  },
  ternary: {
    args: { condition: 'boolean', true: 'any', false: 'any' },
    returns: 'any',
    eval: '#{condition} ? #{true} : #{false}',
  },
  add: {
    args: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} + #{p2}',
  },
  subtract: {
    args: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} - #{p2}',
  },
  multiply: {
    args: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} * #{p2}',
  },
  divide: {
    args: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} / #{p2}',
  },
  modulo: {
    args: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} % #{p2}',
  },
  lessThan: {
    args: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} < #{p2}',
  },
  lessThanOrEqual: {
    args: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} <= #{p2}',
  },
  greaterThan: {
    args: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} > #{p2}',
  },
  greaterThanOrEqual: {
    args: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} >= #{p2}',
  },
  equals: {
    args: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} === #{p2}',
  },
  increment: {
    args: { p1: 'number' },
    returns: 'none',
    eval: '#{p1}++',
  },
};
