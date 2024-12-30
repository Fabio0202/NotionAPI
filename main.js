const {getPokemon} = require('./PokemonAPI');
const todoist = require('./Todoist.js');

require('dotenv').config();
// getPokemon();
// todoist.createInboxTask({content: "Hallo ich bin ein test"});
todoist.getAllNewTasksEveryMinute()