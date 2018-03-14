module.exports = class Coordinate {
  constructor(x, y, z) {
    Object.assign(this, { x: +x, y: +y, z: +z });
  }
};
