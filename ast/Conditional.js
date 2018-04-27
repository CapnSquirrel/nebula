module.exports = class Conditional {
  constructor(location, body) {
    Object.assign(this, { location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    this.body.analyze(context.createChildContextForConstruct(this));
    context.addConstruct(this);
  }
};
