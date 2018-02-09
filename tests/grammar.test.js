const fs = require('fs');
const parse = require('../parser');
const assert = require('chai').assert;

const TEST_DIR = 'tests/data/good-programs';

describe('The grammar', () => {
  fs.readdirSync(TEST_DIR).forEach(name => {
    it(`should compile ${name} without errors`, done => {
      const match = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      if (!match.succeeded()) {
        throw match.message;
      }
      done();
    });
  });
});
