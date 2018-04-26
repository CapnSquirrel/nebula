/*
  Things we need to do semantic analysis for...
  1. Program must have an Origin Default.
  2. There must be a path from result to a value for every Origin (function)?
  3. LINKS:
    a. must be one of the following connections
      1. return -> param
      2. control -> control
    b. each param can only have one Link
    c. each control can only have one link into it
    d. must link returns and params of the same type.
  4. variable/name resolutions:
    a. each accesable id must have one and only one _init_
    b. Origins must have a unique id.
    c. Function ids must have a corresponding Origin (in the program or imported in)
  5. Cannot have coordinate overlaps

  Things we need to do during semantic analysis...
  1. Add things to the id lookup table. Things include:
    a. Origin IDs
    b. Origin Argument IDs
    c. Initialized Accessor IDs
  2. Connect Function components together to be traversed later
    a. This allows us to check path from results to values
  3. Add Constructs to a coordinate -> construct map. In this map, we will also
     handle links by connecting constucts in the map to the linked coordinates.
     This allows us to...
    a. Check coordinate overlap
    b. type check params and Returns
    c. resolve links in linear time
    d. enable traversal from result -> values
 */

const Link = require('../ast/Link.js');

class Context {
  constructor({
    coords = {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
    currentConstruct = null,
    originExists = false,
  } = {}) {
    Object.assign(this, {
      coords,
      currentConstruct,
      originExists,
      declarations: Object.create(null),
      constructMap: Object.create(null),
    });
  }

  createChildContextForOriginBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({
      coords: this.coords,
      parent: this,
      currentFunction,
    });
  }

  createChildContextForFunction() {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      coords: this.coords,
      parent: this,
      currentFunction: this.id,
    });
  }

  createChildContextForConstruct(construct) {
    // For a simple block (i.e., in an if-statement), we have to retain both
    // the function and loop settings.
    return new Context({
      coords: this.coords,
      currentConstruct: construct,
      currentFunction: this.id,
    });
  }

  // Tries to add a link between two constructs in the constructMap. If the "from"
  // location has no construct yet, we put the link to hold it's place and be added
  // later. Similarly for the "to" location.
  addLink(link) {
    const toCoords = link.to.coordinate;
    const fromCoords = link.from.coordinate;
    const [tx, ty, tz, tw] =
      [toCoords.x.value, toCoords.y.value, toCoords.z.value, toCoords.w.value];
    const [fx, fy, fz, fw] =
      [fromCoords.x.value, fromCoords.y.value, fromCoords.z.value, fromCoords.w.value];
    if (!this.constructMap[fx][fy][fz][fw]) {
      this.prepareCoordinate(fx, fy, fz, fw);
      this.constructMap[fx][fy][fz][fw] = link;
    } else if (!this.constructMap[tx][ty][tz][tw]) {
      this.prepareCoordinate(tx, ty, tz);
      this.constructMap[tx][ty][tz][tw] = link;
    } else {
      this.constructMap[tx][ty][tz][tw].link = this.constructMap[fx][fy][fz][fw];
    }
  }

  // Adds the construct given to the constructMap. If a construct already exists there,
  // prepare coordinates will throw an error. But if it's a Link, the construct will be added
  // and the link will be added after.
  addConstruct(construct) {
    const coords = construct.location.coordinate;
    const [x, y, z, w] = [coords.x.value, coords.y.value, coords.z.value, coords.w.value];
    if (!this.constructMap[x][y][z][w]) {
      this.prepareCoordinate(x, y, z);
      this.constructMap[x][y][z][w] = construct;
    } else if (this.constructMap[x][y][z][w] instanceof Link) {
      const link = this.constructMap[x][y][z][w];
      this.constructMap[x][y][z][w] = construct;
      this.addLink(link);
    } else {
      throw new Error(`2 or more constructs located at (${x},${y},${z},${w})`);
    }
  }

  // Prepares the coordinateMap at the given coordinates by creating empty arrays at
  // currently undefined locations. This is also where we check for coordinate overlaps
  prepareCoordinate(x, y, z) {
    if (!this.constructMap[x]) {
      this.constructMap[x] = { y: { z: [] } };
    } else if (!this.constructMap[x][y]) {
      this.constructMap[x][y] = { z: [] };
    } else if (!this.constructMap[x][y][z]) {
      this.constructMap[x][y][z] = [];
    }
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  addID(entity) {
    if (entity.id in this.declarations) {
      throw new Error(`Identitier ${entity.id} already declared in this scope`);
    }
    this.declarations[entity.id] = entity;
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  lookupID(id) {
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
