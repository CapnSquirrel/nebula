const fs = require('fs');
const parse = require('../parser');
const assert = require('chai').assert;

const TEST_DIR = 'tests/data/syntax-errors';

describe('The parser detects a syntax error for', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    const check = name.replace(/-/g, ' ').replace(/\.star$/, '');
    it(check, (done) => {
      const match = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      assert.throws(() => {
        if (!match.succeeded()) {
          throw match.message;
        }
      });
      done();
    });
  });
});
