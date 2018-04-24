module.exports = class Function {
  constructor(id, location, body) {
    Object.assign(this, { id, location, body });
  }
};
