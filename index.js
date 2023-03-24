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
        console.log(id);
        await pause();
        const { name, lat, lng } = places.find((place) => place.id === id);

        console.log(`\n City Information\n`.green);
        console.log('Ciudad:', name);
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('Temperature:');
        console.log('Min:');
        console.log('Max:');
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
