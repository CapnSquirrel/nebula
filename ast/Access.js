const Accessor = require('./Accessor.js');
const Parameter = require('./Parameter.js');
const Result = require('./Result.js');

module.exports = class Access {
  constructor(type, id) {
    Object.assign(this, { type, id });
  }

  analyze(context) {
    if (context.currentConstruct instanceof Accessor) {
      if (!context.addID(context.accessID(this.id.value), context.currentConstruct.id.value)) {
        context.addID({ expectedType: this.type }, this.id.value);
        context.addID(this.type, context.currentConstruct.id.value);
      }
    } else if (context.currentConstruct instanceof Parameter) {
      const functionObject = context.accessID(context.currentFunction.id.value);
      const idType = context.accessID(this.id.value).type;
      if (functionObject[context.currentFunction.id.value] !== idType) {
        throw new Error(`Type Error: ${idType} given for parameter ${context.currentConstruct.id.value} of type ${functionObject[context.currentFunction.id.value]}`);
      }
    } else if (context.currentConstruct instanceof Result) {
      const idType = context.accessID(this.id.value).type;
      if (context.currentConstruct.type !== idType) {
        throw new Error(`Type Error: ${idType} given for Result of type ${context.currentConstruct.type}`);
      }
    }
  }
};
