module.exports = {
  '"print"': {
    params: { message: 'string' },
    returns: 'void',
    funct: 'console.log',
    order: ['message'],
  },
  '"ternary"': {
    params: { condition: 'boolean', true: 'any', false: 'any' },
    returns: 'any',
    eval: '#{condition} ? #{true} : #{false}',
  },
  '"add"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} + #{p2}',
  },
  '"subtract"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} - #{p2}',
  },
  '"multiply"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} * #{p2}',
  },
  '"divide"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} / #{p2}',
  },
  '"modulo"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'number',
    eval: '#{p1} % #{p2}',
  },
  '"lessThan"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} < #{p2}',
  },
  '"lessThanOrEqual"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} <= #{p2}',
  },
  '"greaterThan"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} > #{p2}',
  },
  '"greaterThanOrEqual"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} >= #{p2}',
  },
  '"equals"': {
    params: { p1: 'number', p2: 'number' },
    returns: 'boolean',
    eval: '#{p1} === #{p2}',
  },
  '"increment"': {
    params: { p1: 'number' },
    returns: 'none',
    eval: '#{p1}++',
  },
};
