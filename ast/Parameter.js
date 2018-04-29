module.exports = class Parameter {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);

    // check if the function object has this parameter
    if (!context.functionObject[this.id]) {
      throw new Error(`Incorrect parameter ${this.id} given for function ${context.currentConstruct.id}`);
    }
    if (this.body) {
      this.body.analyze(context.createChildContextForConstruct(this));
      this.isLeaf = true;
    }
    context.addConstruct(this);
  }
};
