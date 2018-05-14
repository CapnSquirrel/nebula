export default class Link {
  constructor(from, to) {
    Object.assign(this, { from, to });
  }

  getClassName() {
    return 'Link';
  }

  analyze(context) {
    this.from.analyze(context);
    this.to.analyze(context);
    context.addLink(this);
  }
}
