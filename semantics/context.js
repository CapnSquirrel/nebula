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
const defaultFunctions = require('../backend/default-modules');

class Context {
  constructor({
    coordinate = {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
    defaultExists = false,
    parentConstruct = null,
    currentFunctionObject = null,
    declarations = {},
    accesses = {},
    constructMap = {},
  } = {}) {
    Object.assign(this, {
      coordinate,
      defaultExists,
      parentConstruct,
      currentFunctionObject,
      declarations,
      accesses,
      constructMap,
    });
  }

  // This is called if an Origin has the default tag. If another default Origin
  // already called this function, it will throw an error.
  defaultExists() {
    if (this.defaultExists) throw new Error('Can only have one default Origin');
    this.defaultExists = true;
  }

  createChildContextForFunction(funct) {
    return new Context({
      coordinate: funct.location.coordinate,
      parentConstruct: funct,
      currentFunctionObject: funct.functionObject,
      declarations: this.declarations,
      constructMap: this.constructMap,
    });
  }

  createChildContextForConstruct(construct) {
    return new Context({
      coordinate: construct.location.coordinate,
      parentConstruct: construct,
      declarations: this.declarations,
      constructMap: this.constructMap,
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
    this.prepareCoordinate(tx, ty, tz);
    const [fx, fy, fz, fw] =
      [fromCoords.x.value, fromCoords.y.value, fromCoords.z.value, fromCoords.w.value];
    this.prepareCoordinate(fx, fy, fz, fw);
    if (!this.constructMap[fx][fy][fz][fw]) {
      this.constructMap[fx][fy][fz][fw] = link;
    } else if (!this.constructMap[tx][ty][tz][tw]) {
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
    this.prepareCoordinate(x, y, z);
    if (!this.constructMap[x][y][z][w]) {
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
      this.constructMap[x] = {};
    }
    if (!this.constructMap[x][y]) {
      this.constructMap[x][y] = {};
    }
    if (!this.constructMap[x][y][z]) {
      this.constructMap[x][y][z] = {};
    }
  }

  markDefaultExists() {
    this.defaultExists = true;
  }

  // add an Argument to FunctionObject in declarations
  addArgument(argument) {
    this.declarations[this.parentConstruct.id.value].params[argument.id.value] = argument.type;
  }

  // add the Result to FunctionObject in declarations
  addResult(result) {
    this.declarations[this.parentConstruct.id.value].returns = result.type;
  }

  // Call this to add a new entity (which could be a variable, a function,
  // or a parameter) to this context. It will check to see if the entity's
  // identifier has already been declared in this context. It does not need
  // to check enclosing contexts because in this language, shadowing is always
  // allowed. Note that if we allowed overloading, this method would have to
  // be a bit more sophisticated.
  addID(typeOrFunctionObject, id) {
    if (!(id in this.declarations)) {
      this.declarations[id] = typeOrFunctionObject;
    } else if (this.declarations[id].expectedType && this.declarations[id].expectedType
        !== typeOrFunctionObject) {
      throw new Error(`Reinitialization Error: ${id} initialized as ${this.typeOrFunctionObject} but expected ${this.declarations[id].expectedType}`);
    } else {
      throw new Error(`Reinitialization Error: ${id} was already initialized`);
    }
  }

  // Returns the entity bound to the given identifier, starting from this
  // context and searching "outward" through enclosing contexts if necessary.
  accessID(id) {
    if (id in this.declarations) {
      return this.declarations[id];
    }
    return false;
  }
}

const declarations = Object.assign({}, defaultFunctions.all);
Context.INITIAL = new Context({ declarations });

module.exports = Context;
