import Context from '../semantics/context';
import Origin from './Origin';
import processTokens from '../backend/generator';

export default class Program {
  constructor(body) {
    Object.assign(this, { body });
  }

  getClassName() {
    return 'Program';
  }

  analyze() {
    const declarations = Object.assign({}, Context.INITIAL.declarations);
    const context = new Context({ declarations });

    // we need to analyze origins first so we have all of the function objects in our declarations.
    this.body.filter(a => a instanceof Origin).forEach(o => o.analyze(context));
    this.body.filter(a => !(a instanceof Origin)).forEach(b => b.analyze(context));

    if (!context.defaultExists) throw new Error('no origin default');

    context.mapCoordsToTokens();

    this.tokens = context.tokens;
  }

  gen() {
    return processTokens(this.tokens);
  }
}
