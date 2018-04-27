module.exports = class Return {
  constructor(location, control) {
    Object.assign(this, { location, control });
  }

  analyze(context) {
    this.location.analyze(context);
    if (this.Control) {
      this.Control.analyze(context.createChildContextForConstruct(this));
    }
    context.addConstruct(this);
  }
};
