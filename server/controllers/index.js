import { Router } from 'express';
import { name, version } from '../../package.json';

let route = Router({
  caseSensitive: true
});

route.get('/', (req, res) => {
  res.json({ name, version });
});

export default route;
