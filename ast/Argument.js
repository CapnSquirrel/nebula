module.exports = class Argument {
  constructor(type, id, location) {
    Object.assign(this, { type, id, location });
  }
};
