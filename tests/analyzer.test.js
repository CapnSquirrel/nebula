const fs = require('fs');
const parse = require('../syntax/parser');
const chai = require('chai');

const GOOD_PROGRAMS = 'tests/data/good-programs';
const ERROR_PROGRAMS = 'tests/data/semantic-errors';

/* eslint-disable no-undef */
describe('The semantic analyzer', () => {
  fs.readdirSync(ERROR_PROGRAMS).forEach((name) => {
    if (name.endsWith('.error')) {
      test(`detects a ${name.replace(/[^a-z]/g, ' ')}`, (done) => {
        const program = parse(fs.readFileSync(`${ERROR_PROGRAMS}/${name}`, 'utf-8'));
        const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' '), 'i');
        chai.assert.throws(() => program.analyze(), errorPattern);
        done();
      });
    } else if (name.endsWith('.star')) {
      test(`should analyze ${name} without errors`, (done) => {
        const program = parse(fs.readFileSync(`${GOOD_PROGRAMS}/${name}`, 'utf-8'));
        program.analyze();
        done();
      });
    }
  });
});
