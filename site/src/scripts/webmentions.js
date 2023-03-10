import fs from "fs";
import unionBy from "lodash/unionBy";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const CACHE_FILE_PATH = "_cache/webmentions.json";
const API = "https://webmention.io/api";
const TOKEN = process.env.WEBMENTION_IO_TOKEN;
const domain = "baldbeardedbuilder.com";
const fiveMinutesAgo = new Date(Date.now() - 5000 * 60);

async function fetchWebMentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn(">>> unable to fetch webmentions: missing domain or token");
    return false;
  }
  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`;
  if (since) url += `&since=${since}`; // only fetch new mentions

  const response = await axios.get(url);

  if (response.status === 200 && response.data) {
    const feed = response.data;

    return feed;
  }
  return null;
}
// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, "wm-id");
}
// save combined webmentions in cache file
function writeToCache(data) {
  const dir = "_cache";
  const fileContent = JSON.stringify(data, null, 2);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  // write data to cache json file
  fs.writeFileSync(CACHE_FILE_PATH, fileContent, (err) => {
    if (err) throw err;
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`);
  });
}
// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH);
    return JSON.parse(cacheFile.toString());
  }
  // no cache found.
  return {
    lastFetched: null,
    children: [],
  };
}

async function getWebMentions() {
  const cache = readFromCache();

  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    const shouldFetch =
      cache.lastFetched == null || new Date(cache.lastFetched) < fiveMinutesAgo;

    if (shouldFetch) {
      const feed = await fetchWebMentions(cache.lastFetched);
      if (feed) {
        const webmentions = {
          lastFetched: new Date().toISOString(),
          children: mergeWebmentions(cache, feed),
        };
        writeToCache(webmentions);
        return webmentions;
      }
    }
  }
  return cache;
}

export async function getMentions(url) {
  const webMentions = await getWebMentions();

  return webMentions.children.filter(entry => entry['wm-target'] === `https://${domain}${url}`)
    .filter(f => (f.author.photo || '').length > 0)
    .filter(f => (f.author.url || '') !== 'https://twitter.com/baldbeardbuild')
    .filter(f => (f.author.url || '') !== 'https://twitter.com/michaeljolley')
}