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

module.exports = { createInboxTask, getProjects };