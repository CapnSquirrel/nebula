module.exports = class Accessor {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
    context.addConstruct(this);
  }
};
