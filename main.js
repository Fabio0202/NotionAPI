const todoist = require('./todoist.js');
const notion = require('./NotionAPI.js');

require('dotenv').config();
// getPokemon();
// todoist.createInboxTask({content: "Hallo ich bin ein test"});
//todoist.getAllNewTasksEveryxSeconds(30);

TodoistToNotionEveryxSeconds(20);

async function TodoistToNotionEveryxSeconds(x) {
    const functionToRun = async () => {
        
        const allTasks = await todoist.getInboxTasks();
        console.log("Alle Tasks vor Filterung:", allTasks);

        //erstellt neue Notionpage für neue Tasks aus Todoist
        const newTasks = todoist.filterOnlyNewTasks(allTasks, x);
        newTasks.map(task => notion.createNotionPage(task));
        console.log("all new Tasks:", newTasks);

        //update Tasks über Todoist
        const updatedTasks = todoist.filterOnlyChangedTasks(allTasks, x);
        console.log("All updated Tasks:", updatedTasks);
    }

    todoist.runEveryxSeconds(functionToRun, x);
}
