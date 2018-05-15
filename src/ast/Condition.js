export default class Condition {
  constructor(location, body) {
    Object.assign(this, { location, body });
  }

  getClassName() {
    return 'Condition';
  }

  analyze(context) {
    this.location.analyze(context);
    if (this.body.length > 0) {
      this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
      this.isLeaf = true;
    }
    context.addConstruct(this);
  }
}
