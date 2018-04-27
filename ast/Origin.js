module.exports = class Origin {
  constructor(isDefault, id, location, body) {
    Object.assign(this, {
      isDefault,
      id,
      location,
      body,
    });
  }

  analyze(context) {
    if (this.isDefault) context.defaultExists();
    this.location.analyze(context);
    context.addID(Object.create(null), this.id.value);
    this.body.forEach(b => b.analyze(context.createChildContextFoConstruct(this)));
    context.addConstruct(this);
  }
};
