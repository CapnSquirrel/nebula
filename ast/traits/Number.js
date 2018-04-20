const Trait = require('../bases/Trait.js');

module.exports = class Number extends Trait {
  analyze() {
    // need to ensure the only arg is a numlit
    if (this.args.length !== 1) {
      throw new Error('Number must have 1 argument');
    } else if (typeof this.args[0].value !== 'number') {
      throw new Error('Must provide a number');
    } else if (this.body.length !== 0) {
      throw new Error('Number cannot have a body');
    }
  }
};
