const Accessor = require('./Accessor.js');
const Parameter = require('./Parameter.js');
const Result = require('./Result.js');

module.exports = class Initialize {
  constructor(type, value) {
    Object.assign(this, { type, value });
  }

  analyze(context) {
    if (context.parentConstruct instanceof Accessor) {
      context.addID(this.type, context.parentConstruct.id.value);
    } else if (context.parentConstruct instanceof Parameter) {
      const parameterType = context.parentConstruct.type;
      if (parameterType !== 'any' && parameterType !== this.type) {
        throw new Error('Type Error: wrong type given to parameter');
      }
      context.addTokenParamInitialize(this, context.parentConstruct.id.value);
    } else if (context.parentConstruct instanceof Result) {
      const resultType = context.parentConstruct.type;
      if (resultType !== this.type) {
        throw new Error('Type Error: wrong type given to result');
      }
      context.addTokenResultAccess(this);
    }
  }
};
