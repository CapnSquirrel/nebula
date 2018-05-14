export default class StringLiteral {
  constructor(value) {
    Object.assign(this, { value });
  }

  getClassName() {
    return 'StringLiteral';
  }
}
