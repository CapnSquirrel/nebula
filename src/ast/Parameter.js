export default class Parameter {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    this.type = context.functionObject.args[this.id.value];

    // check if the function object has this parameter
    if (!this.type) {
      throw new Error('incorrect parameter given for function');
    }
    if (this.body) {
      this.body.analyze(context.createChildContextForConstruct(this));
      this.isLeaf = true;
    } else {
      context.addTokenParam(this);
    }
    context.addConstruct(this);
  }
}
