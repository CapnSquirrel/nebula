let [origin, print] = [];

print = {
  type: 'Function',
  funct: 'print',
  params: { message: 'Hello, world!' },
};

origin = {
  type: 'Origin',
  default: true,
  id: 'hello',
  result: print,
  args: {},
  returns: 'void',
};

export default [origin, print];
