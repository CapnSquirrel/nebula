const Accessor = require('./Accessor.js');
const Parameter = require('./Parameter.js');
const Result = require('./Result.js');

module.exports = class Initialize {
  constructor(type, value) {
    Object.assign(this, { type, value });
  }

  analyze(context) {
    if (context.currentConstruct instanceof Accessor) {
      context.addID(this.type, context.currentConstruct.id.value);
    } else if (context.currentConstruct instanceof Parameter) {
      const parameterType = context.functionObject[context.currentConstruct.id.value];
      if (parameterType !== this.type) {
        throw new Error(`Type Error: ${this.type} given for parameter ${context.currentConstruct.id.value} of type ${parameterType}`);
      }
    } else if (context.currentConstruct instanceof Result) {
      const resultType = context.currentConstruct.type;
      if (resultType !== this.type) {
        throw new Error(`Type Error: ${this.type} given for result of type ${resultType}`);
      }
    }
  }
};
