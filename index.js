require('dotenv').config();

const { getInput, showMenu, pause, listPlaces } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async () => {
  const searchs = new Searchs();
  let option;
  do {
    option = await showMenu();

    switch (option) {
      case 1:
        // show message
        const searchTerm = await getInput('City:');

        // Search places
        const places = await searchs.city(searchTerm);

        // Select place
        const id = await listPlaces(places);
        if (id === 0) continue;

        const { name, lat, lng } = places.find((place) => place.id === id);

        // Save in DB
        searchs.addHistory(name);

        // Weather
        const { temperature, min, max, description } =
          await searchs.weatherPlace(lat, lng);

        // Show result
        console.log(`\nCity Information\n`.green);
        console.log('City:'.blue, name.green);
        console.log('Lat:'.blue, lat);
        console.log('Lng:'.blue, lng);
        console.log('Temperature:'.blue, temperature);
        console.log('Min:'.blue, min);
        console.log('Max:'.blue, max);
        console.log('Weather description:'.blue, description.green);

        break;

      case 2:
        searchs.historyCapitalize.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
