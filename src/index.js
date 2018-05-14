import parse from './syntax/parser';
import mods from './backend/default-modules';
import * as classes from './ast';

export const parseProgram = text => parse(text);

export const analyzeProgram = (text) => {
  const program = parse(text);
  program.analyze();
  return program;
};

export const compileProgram = (text, params) => {
  const program = parse(text);
  return program.gen().runProgram(params);
};

export const modules = mods;
export const ast = classes;

// export const parseProgram = () => console.log('hello');
