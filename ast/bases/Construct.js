module.exports = class Construct {
  constructor(args, locations, body) {
    Object.assign(this, { args, locations, body });
  }
};
