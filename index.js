const Parser = require('rss-parser');
const Mustache = require('mustache');
const fs = require('fs/promises');

async function main() {

  const payload = await generateData();
  const template = await getTemplate();

  const newReadMe = Mustache.render(template, payload);

  await saveReadMe(newReadMe);
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
 *    ]
 * }
 */
async function generateData() {

  const videos = await _generateYTData();
  const posts = await _generateBlogData();

  return {
    posts,
    videos
  };
}

async function _generateYTData() {
  const parser = new Parser({
    customFields: {
      item: ['media:group', 'media:thumbnail'],
    },
  });

  const feed = await parser.parseURL(
    `https://www.youtube.com/feeds/videos.xml?channel_id=UCn2FoDbv_veJB_UbrF93_jw`
  )

  try {
    await fs.opendir('src/content/videos');
  }
  catch (err) {
    await fs.mkdir('src/content/videos');
  }

  // Save md files for site build
  for (i = 0; i < feed.items.length; i++) {
    const video = feed.items[i];
    await fs.writeFile(`src/content/videos/${video.id.replace('yt:video:', '')}.md`,
`---
title: ${video.title}
link: ${video.link}
thumbnail: ${video['media:group']['media:thumbnail'][0].$.url}
date: ${video.pubDate ? new Date(video.pubDate) : new Date() }
---

${video['media:group']['media:description'][0]}
`);
  }

  return feed.items.slice(0, 3).map((m) => {
    return {
      title: m.title,
      link: m.link,
      description: m['media:group']['media:description'][0],
      thumbnail: m['media:group']['media:thumbnail'][0].$.url,
      date: m.pubDate ? new Date(m.pubDate) : new Date()
    }
  });
}

async function _generateBlogData() {
  const parser = new Parser();

  const feed = await parser.parseURL('https://baldbeardedbuilder.com/feed.xml');

  return feed.items.slice(0, 3).map((m) => {
    return {
      title: m.title,
      link: m.link,
      description: m.description,
      date: m.pubDate ? new Date(m.pubDate) : new Date()
    }
  });
}

async function getTemplate() {
  return await fs.readFile("_template.md", "utf-8")
}

async function saveReadMe(newReadMe) {
  await fs.writeFile('README.md', newReadMe);
}

main();