import parseDataFromJson from './setupData';

let global = null;

if (global === null) {
  parseDataFromJson()
    .then(async data => {
      console.log(data);
      global = data;
    })
    .catch(err => {
      console.log(err);
    });
}
export default global;
