module.exports = class Origin {
  constructor(isDefault, id, location, body) {
    Object.assign(this, {
      isDefault,
      id,
      location,
      body,
    });
  }
};
