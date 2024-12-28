const { TodoistApi } = require ("@doist/todoist-api-typescript");

require('dotenv').config();

const api = new TodoistApi(process.env.TODOIST_KEY);

async function getProjects() {
    try {
        const projects = await api.getProjects();
        projects.map(project => console.log(project));
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { getProjects };