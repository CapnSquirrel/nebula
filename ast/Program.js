const Context = require('../semantics/context');

module.exports = class Program {
  constructor(body) {
    Object.assign(this, { body });
  }

  analyze() {
    // need to anaylze Accessors and Origins first to check for declared variables
    const context = new Context({ parent: Context.INITIAL });
    this.statements.forEach(s => s.analyze(context));

    // resolve links
  }
};
