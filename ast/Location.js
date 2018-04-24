module.exports = class Location {
  constructor(isAbsolute, coordinate) {
    Object.assign(this, { isAbsolute, coordinate });
  }
};
