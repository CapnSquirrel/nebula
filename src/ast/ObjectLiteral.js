export default class ObjectLiteral {
  constructor(value) {
    Object.assign(this, { value });
  }

  getClassName() {
    return 'ObjectLiteral';
  }
}
