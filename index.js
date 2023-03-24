const { getInput, showMenu, pause } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

const main = async () => {
  const searchs = new Searchs();
  let option;
  do {
    option = await showMenu();

    switch (option) {
      case 1:
        const place = await getInput('City:');
        await searchs.city(place);

        console.log(`\n City Information\n`.green);
        console.log('Ciudad:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperature:');
        console.log('Min:');
        console.log('Max:');
        break;
    }

    if (option !== 0) await pause();
  } while (option !== 0);
};

main();
