module.exports = class Trait {
  constructor(args, body) {
    Object.assign(this, { args, body });
  }
};
