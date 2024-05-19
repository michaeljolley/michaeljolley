import axios from "axios";
import dotenv from "dotenv";
import { Client as Notion } from "@notionhq/client";
dotenv.config();

const NOTION_OAUTH_TOKEN = process.env.NOTION_OAUTH_TOKEN;

const notion = new Notion({
  auth: NOTION_OAUTH_TOKEN,
});

async function main() {
  try {
    
    const message = await getVOTD();

    // Update Dashboard block for VOTD
    await notion.blocks.update({
      "block_id": "87b9e3c68c2c4559bc58336eca84ab82",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{
          "type": "text",
          "text": {
            "content": message,
          }
        }],
        "color": "brown",
      }
    });
    
  } catch (err) {
    console.log(err);
  }
}

const getVOTD = async () => {
  const votd = await axios($, {
    url: 'https://labs.bible.org/api/?passage=votd&type=json&formatting=plain'
  });

  let reference = `${votd[0].bookname} ${votd[0].chapter}:${votd[0].verse}`;

  if (votd.length > 0) {
    reference = `${reference}-${votd[votd.length-1].verse}`;
  }

  const message = `${votd.map(m => m.text).join('')}
${reference}`;
}

main();
