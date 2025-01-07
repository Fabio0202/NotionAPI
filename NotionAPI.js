require('dotenv').config();
const axios = require("axios");
const { Client } = require("@notionhq/client");
const notionApi = process.env.NOTION_KEY;
const notion = new Client({ auth: notionApi });

async function createNotionPage(task) {
    const properties = {
        "Name": {
            "title": [
                {
                    "type": "text",
                    "text": {
                        "content": task.content
                    }
                }
            ]
        },
        "Priority": {
            "select": {
                "name": task.priority.toString() // Umwandlung in eine Zeichenkette
            }
        }
    };

    if (task.due && task.due.date) {
        properties["Due Date"] = {
            "type": "date",
            "date": { "start": task.due.date }
        };
    }

    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": process.env.NOTION_INBOX_ID,
        },
        "properties": properties
    });
}



module.exports = {createNotionPage}