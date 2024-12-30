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
async function runEveryMinute(fn) {
    await fn();
    setTimeout(() => runEveryMinute(fn), 60000);
}

// eine funktion die alle tasks aus dem inbox project holt
async function getInboxTasks() {
    const tasks = await api.getTasks({projectId: projects[0].id});
    return tasks
}

function filterOnlyNewTasks(tasks) {
    const OneMinuteAgo = getOneMinuteAgo();
    return tasks.filter(task => new Date(task.createdAt) > OneMinuteAgo);
}

// eine funktion die das jetzige datum minus eine minute ausgibt
function getOneMinuteAgo() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    return now;
}


async function getAllNewTasksEveryMinute() {
    const functionToRun = async () => {
        
        const allTasks = await getInboxTasks();
        const filteredTasks = filterOnlyNewTasks(allTasks);
        filteredTasks.map(task => console.log(task.content));
    }

    runEveryMinute(functionToRun);
}

module.exports = { createInboxTask, getProjects,

    runEveryMinute, getInboxTasks,  getAllNewTasksEveryMinute, getOneMinuteAgo
 };

 //wenn Task returned, dann rufe Notion create Page auf