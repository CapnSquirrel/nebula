const fs = require('fs');
const { parseProgram } = require('..');
const chai = require('chai');

const TEST_DIR = 'tests/data/syntax-errors';

/* eslint-disable no-undef */
describe('The parser detects a syntax error for', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    const check = name.replace(/-/g, ' ').replace(/\.star$/, '');
    test(check, (done) => {
      chai.assert.throws(() => {
        parseProgram(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      });
      done();
    });
  });
});
/* eslint-enable no-undef */
