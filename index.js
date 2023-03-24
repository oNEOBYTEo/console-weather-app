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
        const searchTerm = await getInput('City:');

        const places = await searchs.city(searchTerm);

        const id = await listPlaces(places);
        if (id !== 0) {
          const { name, lat, lng } = places.find((place) => place.id === id);

          const { temperature, min, max, description } =
            await searchs.weatherPlace(lat, lng);

          console.log(`\nCity Information\n`.green);
          console.log('City:'.blue, name.green);
          console.log('Lat:'.blue, lat);
          console.log('Lng:'.blue, lng);
          console.log('Temperature:'.blue, temperature);
          console.log('Min:'.blue, min);
          console.log('Max:'.blue, max);
          console.log('Weather description:'.blue, description.green);
        }
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
