require('dotenv').config()
const axios = require('axios');

const API = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN
const domain = 'baldbeardedbuilder.com'

exports.handler = async (event, context) => {

    const url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=1000`
    const response = await axios.get(url)

    if (response.status === 200 && response.data) {
        const feed = response.data

        return {
            statusCode: 200,
            body: JSON.stringify(feed.children
                .filter(f => (f.author.photo || '').length > 0)
                .filter(f => (f.author.url || '') !== 'https://twitter.com/baldbeardbuild')
                .filter(f => (f.author.url || '') !== 'https://twitter.com/michaeljolley')
                .sort(((a, b) => (new Date(a['wm-received']) < new Date(b['wm-received'])) ? 1 : -1)))
        }
    }

    return {
        statusCode: 200,
        body: []
    }
}
