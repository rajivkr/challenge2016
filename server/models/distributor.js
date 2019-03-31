export default class Distributor {
  constructor(name, parentDist = null) {
    this.name = name;
    this.parentDist = parentDist;
    this.includes = {};
    this.excludes = {};
    this.childDists = [];
  }
  addIncludes(code) {
    this.includes[code] = true;
    delete this.excludes[code];
  }
  getParentDist() {
    return this.parentDist;
  }
  addChildDists(distributor) {
    this.childDists.push(distributor);
  }
  addExcludes(code) {
    this.excludes[code] = true;
    delete this.includes[code];
  }
  getChildDists() {
    return this.childDists;
  }
}
