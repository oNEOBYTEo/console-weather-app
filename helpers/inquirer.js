const inquirer = require('inquirer');
require('colors');

const menuQuestions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search City`,
      },
      {
        value: 2,
        name: `${'2.'.green} History`,
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`,
      },
    ],
  },
];

const showMenu = async () => {
  console.clear();
  console.log('======================'.green);
  console.log('   Select an option   '.blue);
  console.log('======================\n'.green);

  const { option } = await inquirer.prompt(menuQuestions);
  return option;
};

const pause = async () => {
  await inquirer.prompt({
    type: 'input',
    message: `Press ${'ENTER'.green} to continue`,
    name: 'pause',
  });
};

const getInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, enter a value';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${'0.'.green} Cancel`,
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select a location:',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Exit`,
  });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

module.exports = {
  showMenu,
  pause,
  getInput,
  listPlaces,
  confirm,
  showCheckList,
};
