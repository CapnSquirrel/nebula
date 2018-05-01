module.exports = class Return {
  constructor(location, control) {
    Object.assign(this, { location, control });
  }

  analyze(context) {
    this.location.analyze(context);
    if (this.control) {
      this.control.analyze(context.createChildContextForConstruct(this));
    }
    context.addConstruct(this);
  }
};
