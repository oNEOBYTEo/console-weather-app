const axios = require('axios');

class Searchs {
  history = ['Tegucigalpa', 'Madrid', 'San josé'];

  constructor() {
    //TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'en',
    };
  }

  async city(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lat,
          lon,
          appid: process.env.OPEN_WEATHER_KEY,
          units: 'metric',
          lang: 'en',
        },
      });
      const { data } = await instance.get();

      return {
        description: data.weather[0].description,
        temperature: data.main.temp,
        min: data.main.temp_min,
        max: data.main.temp_max,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Searchs;
