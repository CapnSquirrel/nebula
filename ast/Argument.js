module.exports = class Argument {
  constructor(type, id, location) {
    Object.assign(this, { type, id, location });
  }

  analyze(context) {
    this.location.analyze(context);
    context.addArgument(this);
    this.isLeaf = true;
    context.addConstruct(this);
  }
};
