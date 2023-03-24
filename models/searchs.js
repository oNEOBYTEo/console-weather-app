const axios = require('axios');

class Searchs {
  history = ['Tegucigalpa', 'Madrid', 'San josé'];

  constructor() {
    //TODO: leer db si existe
  }

  async city(lugar = '') {
    try {
      const resp = await axios.get('Url:example');
      console.log(resp.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Searchs;
