const fs = require('fs');
const { compileProgram } = require('..');
const chai = require('chai');

const TEST_DIR = 'tests/data/code-gen-tests';

/* eslint-disable no-undef */
/* eslint-disable no-eval */

const logger = console.log;
console.log = (x) => {
  logger(x);
  return `${x}`;
};

describe('The program', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.star')) {
      it(`produces the correct output for ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, 'utf-8', (err, text) => {
          const actual = `${eval(compileProgram(text, { n: 5, p: 2, b: 6 }))}`;
          fs.readFile(`${TEST_DIR}/${name}.out`, 'utf-8', (_err, expected) => {
            chai.assert.equal(actual, expected.trim());
            done();
          });
        });
      });
    }
  });
});
/* eslint-enable no-undef */
/* eslint-enable no-eval */
