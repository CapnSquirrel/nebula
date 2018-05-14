export default class SetParameter {
  constructor(type, location) {
    Object.assign(this, { type, location });
  }

  analyze(context) {
    this.location.analyze(context);
    context.addID(this.type, context.parentConstruct.id.value);
    context.addConstruct(this);
  }
}
