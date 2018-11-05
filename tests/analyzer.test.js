const fs = require('fs');
const { analyzeProgram } = require('..');
const chai = require('chai');

const GOOD_PROGRAMS = 'tests/data/good-programs';
const ERROR_PROGRAMS = 'tests/data/semantic-errors';

/* eslint-disable no-undef */
describe('The semantic analyzer', () => {
  fs.readdirSync(ERROR_PROGRAMS).forEach((name) => {
    if (name.endsWith('.error')) {
      test(`detects a ${name.replace(/[^a-z_]/gi, ' ').replace(/_/g, ': ')}`, (done) => {
        const errorPattern = RegExp(name.replace('.error', '').replace(/-/g, ' ').replace(/_/g, ': '), 'i');
        const text = fs.readFileSync(`${ERROR_PROGRAMS}/${name}`, 'utf-8');
        chai.assert.throws(() => analyzeProgram(text), errorPattern);
        done();
      });
    } else if (name.endsWith('.star')) {
      test(`should analyze ${name} without errors`, (done) => {
        const text = fs.readFileSync(`${ERROR_PROGRAMS}/${name}`, 'utf-8');
        analyzeProgram(text);
        done();
      });
    }
  });
});
