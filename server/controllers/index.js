import { Router } from 'express';
import { name, version } from '../../package.json';
import dist from './dist';

let route = Router({
  caseSensitive: true
});

route.use('/dist', dist);

route.get('/', (req, res) => {
  res.json({ name, version });
});

export default route;
