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
        throw new Error('Type Error: wrong type given to variable');
      } else {
        context.addID(idType, context.parentConstruct.id.value);
      }
    } else if (context.parentConstruct instanceof Parameter) {
      const parameterType = context.parentConstruct.type;
      if (parameterType !== 'any' && parameterType !== idType) {
        throw new Error('Type Error: wrong type given to parameter');
      }
      context.addTokenParamAccess(this, context.parentConstruct.id.value);
    } else if (context.parentConstruct instanceof Result) {
      if (context.parentConstruct.type !== idType) {
        throw new Error('Type Error: wrong type given to result');
      }
      context.addTokenResultAccess(this);
    }
  }
};
