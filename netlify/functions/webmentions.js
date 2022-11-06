require('dotenv').config()
const axios = require('axios');

const WEBMENTION_IO_SECRET = process.env.WEBMENTION_IO_SECRET;
const url = 'https://api.github.com/repos/michaeljolley/michaeljolley/dispatches';
const githubPAT = process.env.GITHUB_BUILD_PAT;

function verifySignature(body) {
    if (body.secret !== WEBMENTION_IO_SECRET) {
        throw new Error("Invalid signature");
    }
}

exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);

    try {
        verifySignature(body);
    } catch (err) {
        return {
            statusCode: 403,
        };
    }

    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
            headers: {
                Allow: "Get",
            },
        };
    }

    await axios.post(url, {
        event_type: "publish",
    },
        {
            headers: {
                Authorization: `token ${githubPAT}`,
            }
        });

    return {
        statusCode: 200
    }
}
