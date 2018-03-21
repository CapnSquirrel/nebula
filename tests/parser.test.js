const fs = require('fs');
const assert = require('assert');
const util = require('util');

const parse = require('../syntax/parser');

const TEST_DIR = 'tests/data/ast-tests';

/* eslint-disable no-undef */
describe('The parser', () => {
  fs.readdirSync(TEST_DIR).forEach((name) => {
    if (name.endsWith('.star')) {
      it(`produces the correct AST for ${name}`, (done) => {
        fs.readFile(`${TEST_DIR}/${name}`, 'utf-8', (err, input) => {
          const ast = `${util.inspect(parse(input), { depth: null })}`;
          fs.readFile(`${TEST_DIR}/${name}.txt`, 'utf-8', (_err, expected) => {
            assert.equal(ast.replace(/\s/g, ''), expected.replace(/\s/g, ''));
            done();
          });
        });
      });
    }
  });
});

/* eslint-enable no-undef */
