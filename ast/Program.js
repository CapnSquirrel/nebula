const Context = require('../semantics/context');
const Origin = require('./Origin');

module.exports = class Program {
  constructor(body) {
    Object.assign(this, { body });
  }

  analyze() {
    const context = new Context();

    // we need to analyze origins first so we have all of the function objects in our declarations.
    this.body.filter(a => a instanceof Origin).forEach(o => o.analyze(context));
    this.body.filter(a => !(a instanceof Origin)).forEach(b => b.analyze(context));

    // traverse the graph
  }
};
