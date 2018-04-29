const print = {
  type: 'Function',
  funct: 'print',
  params: { message: 'Hello, world!' },
};

const origin = {
  type: 'Origin',
  default: true,
  id: 'hello',
  params: { result: print }, // params to Origin is the result
};

module.exports = [origin, print];
