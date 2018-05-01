module.exports = class Result {
  constructor(type, location, body, control) {
    Object.assign(this, { type, location });
    if (body && body.length) Object.assign(this, { body });
    if (control) Object.assign(this, { control });
  }

  analyze(context) {
    this.location.analyze(context);
    context.addResult(this);
    if (this.body) {
      this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
    } else {
      context.addTokenResult(this);
    }
    if (this.control) {
      this.control.analyze(context.createChildContextForConstruct(this));
    }
    context.addConstruct(this);
  }
};
