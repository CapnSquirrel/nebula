module.exports = class Function {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    this.functionObject = context.accessID(this.id.value);
    if (!this.functionObject) {
      throw new Error(`function ${this.id.value} does not exist`);
    }
    if (Object.keys(this.functionObject.args).length !== this.body.length - 1) {
      throw new Error(`function ${this.id.value} given ${this.body.length - 1} arguments, but it needs ${Object.keys(this.functionObject.args).length}`);
    }
    this.body.forEach(b => b.analyze(context.createChildContextForFunction(this)));
    context.addConstruct(this);
  }
};
