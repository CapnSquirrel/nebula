module.exports = class Return {
  constructor(location, control) {
    Object.assign(this, { location });
    if (control) Object.assign(this, { control });
  }

  analyze(context) {
    this.location.analyze(context);
    if (this.control) {
      this.control.analyze(context.createChildContextForConstruct(this));
    }
    this.functionToken = context.tokens[context.tokens.length - 1];
    context.addConstruct(this);
  }
};
