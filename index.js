const parse = require('./syntax/parser');

const parseProgram = text => parse(text);

const analyzeProgram = (text) => {
  const program = parse(text);
  program.analyze();
  return program;
};

const compileProgram = (text, params) => {
  const program = parse(text);
  return program.gen().runProgram(params);
};

module.exports = { parseProgram, analyzeProgram, compileProgram };