import axios from "axios";
import dotenv from "dotenv";
import { Client as Twitter } from "twitter-api-sdk";
import { Client as Notion } from "@notionhq/client";
dotenv.config();

const GITHUB_PAT = process.env.GH_PAT;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

const NOTION_OAUTH_TOKEN = process.env.NOTION_OAUTH_TOKEN;
const NOTION_CONTACT_DATABASE_ID = process.env.NOTION_CONTACT_DATABASE_ID;

const notion = new Notion({
  auth: NOTION_OAUTH_TOKEN,
});

const twitter = new Twitter(TWITTER_BEARER_TOKEN);

async function main() {
  try {
    
    const contacts = await getContacts();
   
    for (const contact of contacts) {
      // Try to get the profile image from GitHub if we know the
      // contacts' GitHub handle
      let avatar_url = await getGHProfileImage(contact)
      
      // If we didn't have GitHub, try to get their Twitter profile image
      if (!avatar_url) {
        avatar_url = await getTwitterProfileImage(contact)
      }

      if (avatar_url) {
        await updateContact(contact, avatar_url)
      }
    }

  } catch (err) {
    console.log(err);
  }
}

const getContacts = async () => {
  const notionData = await notion.databases.query({
    database_id: NOTION_CONTACT_DATABASE_ID,
    filter: {
      or: [
        // Filter for contacts with a GitHub handle
        {
          property: "GitHub",
          url: {
            is_not_empty: true
          }
        },
        // Filter for contacts with a Twitter handle
        {
          property: "Twitter",
          url: {
            is_not_empty: true
          }
        }
      ]
    },
  });

  return notionData.results;
}

const updateContact = async (contact, cover_image_url) => {

  const data = {
    cover: {
      type: "external",
      external: { 
        url: cover_image_url
      }
    }
  };

  return notion.pages.update({
    page_id: contact.id,
    properties: data
  });

  // return await axios($, {
  //   url: `https://api.notion.com/v1/pages/${contact.id}`,
  //   headers: {
  //     accept: 'application/json',
  //     'content-type': 'application/json',
  //     Authorization: `Bearer ${NOTION_OAUTH_TOKEN}`,
  //     "Notion-Version": `2021-08-16`,
  //   },
  //   method: "PATCH",
  //   data
  // })
}

const getGHProfileImage = async (contact) => {

  const githubHandle = contact.properties?.GitHub?.url?.split('/').slice(-1)[0]

  if (githubHandle) {

    try {
      const response = await axios($, {
        url: `https://api.github.com/users/${githubHandle}`,
        headers: {
          accept: 'application/vnd.github+json',
          Authorization: `Bearer ${GITHUB_PAT}`,
          "X-GitHub-Api-Version": `2022-11-28`,
        },
        method: "GET"
      })

      return response.avatar_url
    }
    catch (error) {}
  }

  return undefined
}

const getTwitterProfileImage = async (contact) => {

  const twitterHandle = contact.properties?.Twitter?.url?.split('/').slice(-1)[0]

  if (twitterHandle) {
    try {
      const { data } = await twitter.users.findUserByUsername(twitterHandle, {
        "user.fields": [
          "profile_image_url"
        ]
      });

     if (data) {
       return data.profile_image_url
     }
    }
    catch (error) {
     console.log(`Error: (${error.status}) ${error.statusText}`);
    }
  }

 return undefined
}

main();
