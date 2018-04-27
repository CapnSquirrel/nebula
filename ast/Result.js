module.exports = class Result {
  constructor(type, location, body, control) {
    Object.assign(this, {
      type,
      location,
      body,
      control,
    });
  }

  analyze(context) {
    this.location.analyze(context);
    context.addResult(this);
    if (this.body) {
      this.body.analyze(context.createChildContextForConstruct(this));
    }
    if (this.control) {
      this.control.analyze(context.createChildContextForConstruct(this));
    }
    context.addConstruct(this);
  }
};
