import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import controllers from './controllers';
import parseDataFromJson from './setupData';

let server;
const app = express();
const { BB_PORT: port = '5000', NODE_ENV: env = 'development' } = process.env;

server = http.createServer(app);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

parseDataFromJson()
  .then(async data => {
    app.set('dataObj', data);
    app.use('/api', controllers);

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    if (env !== 'test') {
      server.listen(port, () => {
        console.log(`Started on port ${server.address().port} in ${env} mode`);
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

export default app;
