import { Router } from 'express';
import distributor from '../entities/distributors';

let route = Router({ caseSensitive: true });

route.post('/create', (req, res, next) => {
  let {
    name: distName,
    includes: distIncludes,
    excludes: distExcludes
  } = req.body;
  const includesCodes = distIncludes.split(',').map(e => e.trim());
  const excludeCodes = distExcludes.split(',').map(e => e.trim());
  distributor.addNewDistributor(distName, includesCodes, excludeCodes);
  return res.send(distributor.getDistributor(distName));
});

route.post('/relate', (req, res, next) => {
  let { relatedDists: distRelation } = req.body;
  const distArray = distRelation.split('<').map(a => a.trim());
  const result = distributor.attachDistributors(distArray[0], distArray[1])
    ? `Attached ${distArray[1]}, ${distArray[0]}`
    : `Unable to attach ${distArray[1]}, ${distArray[0]}`;
  return res.send(result);
});

route.post('/query', (req, res, next) => {
  let { name: distName, place: distPlace } = req.body;
  return res.send(distributor.checkDistributor(distName, distPlace));
});

route.post('/find', (req, res, next) => {
  let { name: distName } = req.body;
  let result = distributor.getDistributor(distName)
    ? `Found out for  ${distName} `
    : `Not able to find ${distName}`;
  return res.send(result);
});

export default route;
