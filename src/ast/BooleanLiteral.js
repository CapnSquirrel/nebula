export default class BooleanLiteral {
  constructor(value) {
    Object.assign(this, { value });
  }

  getClassName() {
    return 'BooleanLiteral';
  }
}
