module.exports = class Parameter {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);

    // check if the function object has this parameter
    if (!context.functionObject.args[this.id.value]) {
      throw new Error(`Incorrect parameter ${this.id.value} given for function ${context.parentConstruct.id.value}`);
    }
    if (this.body) {
      this.body.forEach(b => b.analyze(context.createChildContextForConstruct(this)));
      this.isLeaf = true;
    }
    context.addConstruct(this);
  }
};
