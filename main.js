const {getPokemon} = require('./PokemonAPI');
const todoist = require('./Todoist.js');
const notion = require('./NotionAPI.js');

require('dotenv').config();
// getPokemon();
// todoist.createInboxTask({content: "Hallo ich bin ein test"});
//todoist.getAllNewTasksEveryxSeconds(30);
notion.createNotionPage({content: "Hallo ich bin ein test"});