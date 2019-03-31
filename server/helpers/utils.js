import Cities from '../models/cities';
import Provinces from '../models/provinces';
import Countries from '../models/countries';

export function isCodeValid(code) {
  return code in Cities || code in Provinces || code in Countries;
}

export function isHierarchyValid(code, compare) {
  if (code === compare) return true;
  return code.includes(compare);
}

export function getDistFromSeq(place) {
  if (place in Cities) return Cities[place];
  if (place in Provinces) return Provinces[place];
  if (place in Countries) return Countries[place];
  return null;
}
