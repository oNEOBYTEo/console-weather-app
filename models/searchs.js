const fs = require('fs');

const axios = require('axios');

class Searchs {
  history = [];
  dbPath = './db/database.json';

  constructor() {
    this.readDB();
  }

  get historyCapitalize() {
    return this.history.map((place) => {
      let words = place.split(' ');
      words = words.map((p) => p[0].toUpperCase() + p.substring(1));

      return words.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'en',
    };
  }

  get paramsWeather() {
    return { appid: process.env.OPEN_WEATHER_KEY, units: 'metric', lang: 'en' };
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
          ...this.paramsWeather,
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

  addHistory(place = '') {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }

    this.history = this.history.splice(0, 6);

    this.history.unshift(place);
    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (fs.existsSync(this.dbPath))
      this.history = JSON.parse(
        fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
      ).history;
  }
}

module.exports = Searchs;
