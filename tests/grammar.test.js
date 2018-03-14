const fs = require('fs');
const parse = require('../syntax/parser');
const assert = require('chai').assert;

const TEST_DIR = 'tests/data/good-programs';

describe('The grammar', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    test(`should parse ${name} without errors`, (done) => {
      assert.doesNotThrow(() => {
        parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      });
      done();
    });
  });
});
