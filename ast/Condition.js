module.exports = class Condition {
  constructor(location, body) {
    Object.assign(this, { location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    if (this.body) {
      this.body.analyze(context.createChildContextForConstruct(this));
      this.isLeaf = true;
    }
    context.addConstruct(this);
  }
};
