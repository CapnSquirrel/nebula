module.exports = class Control {
  constructor(location) {
    Object.assign(this, { location });
  }

  analyze(context) {
    this.location.analyze(context);
    context.addConstruct(this);
  }
};
