export default class Location {
  constructor(isAbsolute, coordinate) {
    Object.assign(this, { isAbsolute, coordinate });
  }

  analyze(context) {
    if (!this.isAbsolute) {
      this.coordinate.analyze(context);
      this.isAbsolute = true;
    }
  }
}
