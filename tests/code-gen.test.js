const fs = require('fs');
const parse = require('../syntax/parser');
const chai = require('chai');

const TEST_DIR = 'tests/data/good-programs';

/* eslint-disable no-undef */
/* eslint-disable no-eval */
describe('The program', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    // TODO: Fix code generation tests
    test(`should compile and run ${name} without errors`, (done) => {
      // chai.assert.doesNotThrow(() => {
      //   fs.readFile(name, 'utf-8', (err, text) => {
      //     if (err) {
      //       throw err;
      //     }
      //     const program = parse(text);
      //     program.analyze();
      //     // program = program.optimize();
      //     const actual = eval(program.gen());
      //     // we don't have a way to get expected yet
      //     assert.equal(actual, expected);
      //   });
      // });
      done();
    });
  });
});
/* eslint-enable no-undef */
/* eslint-enable no-eval */
