const fs = require('fs');
const assert = require('assert');
const parse = require('../syntax/parser');

const TEST_DIR = 'tests/data/good-programs';

describe('The parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.star')) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          const ast = parse(input);
          fs.readFile(`${TEST_DIR}/${name}.json`, 'utf-8', (_err, expected) => {
            assert.deepEqual(ast, JSON.parse(expected));
            done();
          });
        });
      });
    }
  });
});
