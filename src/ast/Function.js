export default class Function {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }

  analyze(context) {
    this.location.analyze(context);
    this.functionObject = context.accessID(this.id.value);
    if (!this.functionObject) {
      throw new Error('function without origin');
    }
    if (Object.keys(this.functionObject.args).length !== this.body.length - 1) {
      throw new Error('function with wrong number of arguments');
    }
    context.addTokenFunction(this);
    this.body.forEach(b => b.analyze(context.createChildContextForFunction(this)));
    context.addConstruct(this);
  }
}
