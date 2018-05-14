export default class Conditional {
  constructor(location, body) {
    Object.assign(this, { location, body });
  }

  getClassName() {
    return 'Conditional';
  }

  analyze(context) {
    this.location.analyze(context);
    this.body.analyze(context.createChildContextForConstruct(this));
    context.addConstruct(this);
  }
}
