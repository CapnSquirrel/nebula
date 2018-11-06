export default class ObjectLiteral {
  constructor(raw) {
    Object.assign(this, { raw });
  }

  getClassName() {
    return 'ObjectLiteral';
  }

  /*
  analyze(){
    this.raw.JSON.parse();
    this.val = this.raw.JSON.parse();
  }
  */
}
