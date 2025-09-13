import Parser from "rss-parser";
import Mustache from "mustache";
import fs from "fs/promises";
import matter from "gray-matter";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    const payload = await generateData();
    const template = await getTemplate();
    const newReadMe = Mustache.render(template, payload);
    await saveReadMe(newReadMe);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Example data object:
 * {
 *    posts: [
 *      {
 *        title: String,
 *        link: String,
 *        description: String,
 *        date: Date
 *      }
 *    ],
 *    videos: [
 *      {
 *        title: String,
 *        link: String,
 *        date: Date,
 *        description: String,
 *        thumbnail: String
 *      }
 *    ],
 * 		clips: [
 * 			{
 *				title: String,
 *				views: Number,
 *				url: String,
 *				embed: String,
 *				thumbnail: String,
 *		  }
 * 		],
 * }
 */
async function generateData() {
  const posts = await _generateBlogData();
  const videos = await _generateYTData();
  const twitch = await _generateTwitchData();

  return {
    posts,
    ...twitch,
    videos,
  };
}

async function _generateYTData() {
  const parser = new Parser({
    customFields: {
      item: ["media:group", "media:thumbnail"],
    },
  });

  const feed = await parser.parseURL(
    `https://www.youtube.com/feeds/videos.xml?channel_id=UCn2FoDbv_veJB_UbrF93_jw`
  );
  
 return feed.items.filter(f => (f.title.match(/#/g) || []).length <= 1)
  .slice(0, 3).map((m) => {
    return {
      title: m.title,
      link: m.link,
      description: m["media:group"]["media:description"][0],
      thumbnail: `https://i2.ytimg.com/vi/${m.id.replace(
        "yt:video:",
        ""
      )}/mqdefault.jpg`,
      date: m.pubDate ? new Date(m.pubDate) : new Date(),
    };
  });
}

async function _generateTwitchData() {
  const opts = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const params = opts.toString();

  const { data } = await axios.post(
    `https://id.twitch.tv/oauth2/token?${params}`
  );

  const {
    data: { data: clips },
  } = await axios.get(
    `https://api.twitch.tv/helix/clips?broadcaster_id=${process.env.TWITCH_CHANNEL_ID}&first=50`,
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  const randomClips = [];
  for (let i = 0; i < 3; i++) {
    randomClips.push(
      ...clips.splice([Math.floor(Math.random() * clips.length)], 1)
    );
  }

  const {
    data: { data: streams },
  } = await axios.get(
    `https://api.twitch.tv/helix/videos?user_id=${process.env.TWITCH_CHANNEL_ID}`,
    {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${data.access_token}`,
      },
    }
  );

  return {
    clips: randomClips.map((m) => {
      return {
        title: m.title,
        views: m.view_count,
        url: m.url,
        embed: m.embed_url,
        thumbnail: m.thumbnail_url,
      };
    }),
    streams: streams.slice(0, 1).map((m) => {
      return {
        id: m.id,
        title: m.title,
        url: m.url,
        thumbnail: m.thumbnail_url
          .replace("%{width}", "480")
          .replace("%{height}", "272"),
      };
    }),
  };
}

async function _generateBlogData() {
  const parser = new Parser();

  const feed = await parser.parseURL(`https://baldbeardedbuilder.com/rss.xml`);

  return feed.items
    .filter((m) => m.link.includes("/blog/"))
    .sort((a, b) => {
      return new Date(b.pubDate) - new Date(a.pubDate);
    })
    .slice(0, 3)
    .map((m) => {
      return {
        title: m.title,
        link: m.link,
        description: m.description,
        date: m.pubDate ? new Date(m.pubDate) : new Date(),
      };
    });
}

async function getTemplate() {
  return await fs.readFile("_template.md", "utf-8");
}

async function saveReadMe(newReadMe) {
  await fs.writeFile("../README.md", newReadMe);
}

main();
