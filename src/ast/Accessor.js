export default class Accessor {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  getClassName() {
    return 'Accessor';
  }

  analyze(context) {
    this.location.analyze(context);
    this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
    context.addConstruct(this);
  }
}
