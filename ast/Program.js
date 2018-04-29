const Context = require('../semantics/context');
const Origin = require('./Origin');

module.exports = class Program {
  constructor(body) {
    Object.assign(this, { body });
  }

  analyze() {
    const context = Context.INITIAL;

    // we need to analyze origins first so we have all of the function objects in our declarations.
    this.body.sort(a => a instanceof Origin);
    this.body.forEach(b => b.analyze(context));

    // traverse the graph
  }
};
