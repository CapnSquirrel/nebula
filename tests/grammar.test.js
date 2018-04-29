const fs = require('fs');
const parse = require('../syntax/parser');
const chai = require('chai');

const TEST_DIR = 'tests/data/good-programs';

/* eslint-disable no-undef */
describe('The grammar', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    test(`should parse ${name} without errors`, (done) => {
      chai.assert.doesNotThrow(() => {
        parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      });
      done();
    });
  });
});
/* eslint-enable no-undef */
