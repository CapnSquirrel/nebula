module.exports = class Result {
  constructor(type, location, body, control) {
    Object.assign(this, {
      type,
      location,
      body,
      control,
    });
  }
};
