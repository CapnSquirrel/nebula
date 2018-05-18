export default class Return {
  constructor(location, control) {
    Object.assign(this, { location });
    if (control) Object.assign(this, { control });
  }

  getClassName() {
    return 'Return';
  }

  analyze(context) {
    this.location.analyze(context);
    this.type = context.functionObject.returns;
    if (this.control) {
      this.control.analyze(context.createChildContextForConstruct(this));
    }
    this.functionToken = context.tokens[context.tokens.length - 1];
    context.addConstruct(this);
  }
}
