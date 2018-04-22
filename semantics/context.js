/* Things we need to do semantic analysis for...
  1. Program must have an Origin Default.
  2. Every Origin must have types for result and parameters.
  3. For every object, do we have necessary return, params, and possible control?
    a. and Coordinate, 2 for links, 1 for the rest.
  4. There must be a path from return to a value for every Origin (function)?
  5. LINKS:
    a. must be one of the following connections
      1. return -> param
      2. control -> control
    b. each param can only have one Link
    c. each control can only have one link into it
  6. variable/name resolutions:
    a. each "id" must have one and only one _init_
    b. Origins must have a unique id.
  7. Cannot have coordinate overlaps
 */

class Context {
  constructor({
    coords = null,
    parent = null,
    currentFunction = null,
  } = {}) {
    Object.assign(this, {
      coords,
      parent,
      currentFunction,
      declarations: Object.create(null),
    });
  }

  createChildContextForBlock() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
    });
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  add(entity) {
    if (entity.id in this.declarations) {
      throw new Error(`Identitier ${entity.id} already declared in this scope`);
    }
    this.declarations[entity.id] = entity;
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookup(id) {
    if (id in this.declarations) {
      return this.declarations[id];
    } else if (this.parent === null) {
      throw new Error(`Identifier ${id} has not been declared`);
    } else {
      return this.parent.lookup(id);
    }
  }
}

Context.INITIAL = new Context();
module.exports = Context;
