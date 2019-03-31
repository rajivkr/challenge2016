import Model from './entities/model';
import Countries from './models/countries';
import Provinces from './models/provinces';
import Cities from './models/cities';
import Global from './models/globals';

function createObj(collection, code, ClassName, name, parent) {
  if (!collection[code]) {
    collection[code] = new ClassName(name, code, parent);
    parent.children[code] = collection[code];
  }
  return collection[code];
}

export default () => {
  return new Promise((resolve, reject) => {
    var fs = require('fs');
    var data = fs.readFileSync('cities.json', 'utf8');
    var inputDataJson = JSON.parse(data);
    inputDataJson.forEach(rowData => {
      const {
        'City Code': cityCode,
        'Province Code': provinceCode,
        'Country Code': countryCode,
        'City Name': cityName,
        'Province Name': provinceName,
        'Country Name': countryName
      } = rowData;

      let countryObj = null;
      let provinceObj = null;
      let cityObj = null;

      countryObj = createObj(
        Countries,
        countryCode,
        Model,
        countryName,
        Global
      );

      provinceObj = createObj(
        Provinces,
        `${provinceCode}-${countryCode}`,
        Model,
        provinceName,
        countryObj
      );

      cityObj = createObj(
        Cities,
        `${cityCode}-${provinceCode}-${countryCode}`,
        Model,
        cityName,
        provinceObj
      );
    });
    resolve(Global);
  });
};
