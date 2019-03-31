import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import controllers from './controllers';
import parseDataFromJson from './setupData';

let server;
const app = express();
const { BB_PORT: port = '5001', NODE_ENV: env = 'development' } = process.env;

server = http.createServer(app);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

parseDataFromJson()
  .then(async data => {
    app.set('dataObj', data);
    app.use('/api', controllers);

    app.get('/*', (req, res) => {
      res.send(' Please use Apis for Create/Query/Attach Dist');
    });
    if (env !== 'test') {
      server.listen(port, err => {
        if (err) {
          console.error(err);
        } else
          console.log(
            `Started on port ${server.address().port} in ${env} mode`
          );
      });
    }
  })
  .catch(err => {
    console.log(err);
  });

export default app;
