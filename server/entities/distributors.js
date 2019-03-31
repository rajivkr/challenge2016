import Distributors from '../models/distributors';
import Distributor from '../models/distributor';
import {
  isCodeValid,
  isHierarchyValid,
  getDistFromSeq
} from '../helpers/utils';

class DistributorEntity {
  getDistributorList() {
    return Object.keys(Distributors).length === 0 ? null : Distributors;
  }

  getDistributor(name) {
    return Distributors[name] ? Distributors[name] : null;
  }

  isDistributorPresent(name) {
    return name in Distributors;
  }

  checkDistributor(distributor, place) {
    if (!isCodeValid(place)) {
      return 'N';
    }

    if (!this.isDistributorPresent(distributor)) {
      return 'N';
    }

    const distributorObj = this.getDistributor(distributor);
    const distIncludes = Object.keys(distributorObj.includes);

    if (!distIncludes.includes(place)) {
      let temp = false;
      distIncludes.map(includedPlace => {
        if (isHierarchyValid(place, includedPlace)) temp = true;
      });
      if (temp === false) {
        return 'N';
      }
    }
    let tempDistObj = distributorObj;
    while (tempDistObj != null) {
      if (place in tempDistObj.excludes) {
        return 'N';
      }
      tempDistObj = tempDistObj.parent;
    }
    return 'Y';
  }

  addNewDistributor(name, includes, excludes) {
    if (name in Distributors) return false;
    if (includes.length === 0) {
      return false;
    }
    for (let i = 0; i < includes.length; i++) {
      if (!isCodeValid(includes[i])) {
        return false;
      }
    }
    if (
      excludes.length > 0 &&
      (excludes.length === 1 && excludes[0].length > 0)
    ) {
      for (let i = 0; i < excludes.length; i++) {
        if (!isCodeValid(excludes[i])) {
          return false;
        }
      }
    }

    const newDistObj = new Distributor(name);
    for (let i = 0; i < includes.length; i++)
      newDistObj.addIncludes(getDistFromSeq(includes[i]).code);
    for (let i = 0; i < excludes.length; i++) {
      if (getDistFromSeq(excludes[i]))
        newDistObj.addExcludes(getDistFromSeq(excludes[i]).code);
    }

    Distributors[name] = newDistObj;
    return true;
  }

  attachDistributors(d2, d1) {
    if (!this.isDistributorPresent(d1) || !this.isDistributorPresent(d2)) {
      return false;
    }
    const dist1 = this.getDistributor(d1);
    const dist2 = this.getDistributor(d2);

    const includesDist1 = Object.keys(dist1.includes);
    const includesDist2 = Object.keys(dist2.includes);

    for (let i = 0; i < includesDist2.length; i++) {
      if (!(includesDist2[i] in dist1.includes)) {
        let temp = false;
        for (let j = 0; j < includesDist1.length; j++) {
          if (isHierarchyValid(includesDist2[i], includesDist1[j])) temp = true;
        }
        if (temp === false) {
          return temp;
        }
      }
    }
    let tempDistObj = dist1;
    while (tempDistObj != null) {
      for (let i = 0; i < includesDist2.length; i++) {
        if (includesDist2[i] in tempDistObj.excludes) {
          return false;
        } else {
          let tempDistObjAr = Object.keys(tempDistObj.excludes);
          for (let j = 0; j < tempDistObjAr.length; j++) {
            if (isHierarchyValid(includesDist2[i], tempDistObjAr[j])) {
              return false;
            }
          }
        }
      }
      tempDistObj = tempDistObj.parent;
    }
    dist2.parent = dist1;
    dist1.childDists.push(dist2);
    return true;
  }
}

// Singelton pattern
const distributor = new DistributorEntity();
export default distributor;
