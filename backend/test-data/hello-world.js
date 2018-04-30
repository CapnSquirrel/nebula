let [origin, print] = [];

origin = {
  type: 'Origin',
  default: true,
  id: 'hello',
  params: { result: print },
  args: {},
};

print = {
  type: 'Function',
  funct: 'print',
  params: { message: 'Hello, world!' },
};

module.exports = [origin, print];
