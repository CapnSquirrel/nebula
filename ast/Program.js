const Context = require('../semantics/context');
const Origin = require('./Origin');

module.exports = class Program {
  constructor(body) {
    Object.assign(this, { body });
  }

  analyze() {
    const declarations = Object.assign({}, Context.INITIAL.declarations);
    const context = new Context({ declarations });

    // we need to analyze origins first so we have all of the function objects in our declarations.
    this.body.filter(a => a instanceof Origin).forEach(o => o.analyze(context));
    this.body.filter(a => !(a instanceof Origin)).forEach(b => b.analyze(context));

    if (!context.defaultExists) throw new Error('no origin default');

    context.mapCoordsToTokens();

    // traverse the graph
  }
};
