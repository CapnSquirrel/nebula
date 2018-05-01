const Accessor = require('./Accessor.js');
const Parameter = require('./Parameter.js');
const Result = require('./Result.js');

module.exports = class Access {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }

  analyze(context) {
    let idType = context.accessID(this.id.value, this.type);
    if (idType.expectedType) idType = idType.expectedType;
    if (context.parentConstruct instanceof Accessor) {
      if (idType !== this.type) {
        throw new Error(`Type Error: ${idType} given for new variable ${context.parentConstruct.id.value} of type ${this.type}`);
      } else {
        context.addID(idType, context.parentConstruct.id.value);
      }
    } else if (context.parentConstruct instanceof Parameter) {
      const parameterType = context.functionObject.args[context.parentConstruct.id.value];
      if (parameterType !== 'any' && parameterType !== idType) {
        throw new Error(`Type Error: ${idType} given for parameter ${context.parentConstruct.id.value} of type ${parameterType}`);
      }
      context.addTokenParamAccess(this, context.parentConstruct.id.value);
    } else if (context.parentConstruct instanceof Result) {
      if (context.parentConstruct.type !== idType) {
        throw new Error(`Type Error: ${idType} given for Result of type ${context.parentConstruct.type}`);
      }
      context.addTokenResultAccess(this);
    }
  }
};
