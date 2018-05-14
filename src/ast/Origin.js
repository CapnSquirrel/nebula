export default class Origin {
  constructor(isDefault, id, location, body) {
    Object.assign(this, {
      isDefault,
      id,
      location,
      body,
    });
  }

  analyze(context) {
    if (this.isDefault) context.markDefaultExists();
    this.location.analyze(context);
    context.addID({ args: [] }, this.id.value);
    context.addTokenOrigin(this);
    this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
    context.addConstruct(this);
  }
}
