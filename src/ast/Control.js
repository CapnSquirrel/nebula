export default class Control {
  constructor(location) {
    Object.assign(this, { location });
  }

  getClassName() {
    return 'Control';
  }

  analyze(context) {
    this.location.analyze(context);
    context.addConstruct(this);
  }
}
