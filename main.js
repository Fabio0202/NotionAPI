const todoist = require('./todoist.js');
const notion = require('./NotionAPI.js');

require('dotenv').config();
// getPokemon();
// todoist.createInboxTask({content: "Hallo ich bin ein test"});
//todoist.getAllNewTasksEveryxSeconds(30);

TodoistToNotionEveryxSeconds(30);

async function TodoistToNotionEveryxSeconds(x) {
    const functionToRun = async () => {
        
        const allTasks = await todoist.getInboxTasks();
        const filteredTasks = todoist.filterOnlyNewTasks(allTasks, x);
        filteredTasks.map(task => notion.createNotionPage(task));
    }

    todoist.runEveryxSeconds(functionToRun, x);
}
