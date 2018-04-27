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

  // Only analyzes if the location holding the coordinate isn't absolute.
  // Adds the coordinate's relative values to the context's coordinates.
  analyze(context) {
    this.x.value += context.coordinate.x.value;
    this.y.value += context.coordinate.y.value;
    this.z.value += context.coordinate.z.value;
    this.w.value += context.coordinate.w.value;
  }
};
