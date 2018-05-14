export default class Link {
  constructor(from, to) {
    Object.assign(this, { from, to });
  }

  analyze(context) {
    this.from.analyze(context);
    this.to.analyze(context);
    context.addLink(this);
  }
}
