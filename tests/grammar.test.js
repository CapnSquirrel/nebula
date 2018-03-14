const fs = require('fs');
const parse = require('../syntax/parser');

const TEST_DIR = 'tests/data/good-programs';

describe('The grammar', () => {
  fs.readdirSync(TEST_DIR).forEach(name => {
    it(`should parse ${name} without errors`, done => {
      const match = parse(fs.readFileSync(`${TEST_DIR}/${name}`, 'utf-8'));
      if (!match.succeeded()) {
        throw match.message;
      }
      done();
    });
  });
});
