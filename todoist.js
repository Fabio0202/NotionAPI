const { TodoistApi } = require ("@doist/todoist-api-typescript");

require('dotenv').config();

const api = new TodoistApi(process.env.TODOIST_KEY);

const projects = [
    {
        name: "Inbox",
        id: '2169795369'
    },
    {
        name: "Current Tasks",
        color: '2343459897'
    }
]

async function createInboxTask({content}) {
const task = await   api.addTask({ content, projectId: projects[0].id} )
return task;
}

async function getProjects() {
    try {
        const projects = await api.getProjects();
        projects.map(project => console.log(project));
    }
    catch (error) {
        console.log(error);
    }
}

// eine funktion die eine andere funktion jede minute abruft
async function runEveryxSeconds(fn, x) {
    await fn();
    setTimeout(() => runEveryxSeconds(fn, x), (x * 1000));
}

// eine funktion die alle tasks aus dem inbox project holt
async function getInboxTasks() {
    const tasks = await api.getTasks({projectId: projects[0].id});
    return tasks
}

function filterOnlyNewTasks(tasks, x) {
    const xSecondsAgo = getxSecondsAgo(x);
    return tasks.filter(task => new Date(task.createdAt) > xSecondsAgo);
}

// eine Funktion, die alle Tasks filtert nach Tasks die geändert wurden
function filterOnlyChangedTasks(oldTasks, newTasks) {
        const changedTasks = [];
        oldTasks.map((oldTask) => {
            const newTask = newTasks.find((task) => task.id == oldTask.id) 
            if (newTask) {
                if (hasTaskChanged(oldTask, newTask)) {
                    changedTasks.push(newTask);
                }
            }
        }
    );
    return changedTasks;
}

function hasTaskChanged(oldTask, newTask) {
    if (newTask.priority !== oldTask.priority) return true;
    if (hasDateChanged(oldTask, newTask)) return true;
    if(newTask.content !== oldTask.content) return true;
    return false;
}

function hasDateChanged(oldTask, newTask) {
    //checkt ob beide null sind
    if(!newTask.due && !oldTask.due) return false;
    //checkt ob Datum hinzugefügt oder gelöscht wurde (also wenn nur eins von beiden null ist)
    if ((newTask.due === null) !== (oldTask.due === null)) return true;
    //checkt ob das Datum geändert wurde
    if (newTask.due.date !== oldTask.due.date || newTask.due.isRecurring !== oldTask.due.isRecurring) return true;
    return false;
}

// eine funktion die das jetzige datum minus eine minute ausgibt
function getxSecondsAgo(x) {
    const now = new Date();
    now.setSeconds(now.getSeconds() - x);
    return now;
}



module.exports = { createInboxTask, getProjects,

    runEveryxSeconds, getInboxTasks, filterOnlyNewTasks, filterOnlyChangedTasks
 };

//wenn Task returned, dann rufe Notion create Page auf