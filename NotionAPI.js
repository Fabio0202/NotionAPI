require('dotenv').config();
const axios = require("axios");
const { Client } = require("@notionhq/client");
const notionApi = process.env.NOTION_KEY;
const notion = new Client({ auth: notionApi });

async function createNotionPage(task) {
    const response = await notion.pages.create({
      "parent": {
        "type": "database_id",
        "database_id": process.env.NOTION_DATABASE_ID,
      },
        "properties": {
            "Name": {
                "title": [
                    {
                        "type": "text",
                        "text": {
                            "content": task.content
                        }
                    }
                ]
            }
        }

})
}

module.exports = {createNotionPage}