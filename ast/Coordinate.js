module.exports = class Coordinate {
  constructor(args) {
    const [x, y = 0, z = 0, w = 0] = args;
    Object.assign(this, {
      x,
      y,
      z,
      w,
    });
  }
};
