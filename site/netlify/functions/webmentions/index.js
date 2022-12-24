const { Client, query } = require('faunadb')
require('dotenv').config()
const { getAsset } = require('./cloudinary')
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
    secure: true
});

const WEBMENTION_IO_SECRET = process.env.WEBMENTION_IO_SECRET;
const client = new Client({
    secret: process.env.FAUNADBSECRET
})

function verifySignature(payload) {
    if (payload.secret !== WEBMENTION_IO_SECRET) {
        throw new Error("Invalid signature");
    }
}

exports.handler = async (event, context) => {

    const payload = JSON.parse(event.body)

    try {
        verifySignature(body);
    } catch (err) {
        return {
            statusCode: 403,
        };
    }

    if (payload.post) {
        const { post } = payload

        const url = new URL(post.target)

        const webMention = {
            type: post["wm-property"],
            published: post.published,
            url: post.url,
            author: {
                name: post.author.name,
                photo: post.author.photo,
            },
            target: url.pathname,
            source: post.source,
        }

        // See if this mention exists by source, if not add it.
        const existingMention = await getWebMentionBySource(webMention.source)

        if (!existingMention) {
            await createMention(webMention)
        }

        return {
            statusCode: 200,
            body: JSON.stringify({}),
        }
    }
}

function mapResponse(payload) {
    return {
        ...payload.data,
        _id: payload.ref.value.id
    }
}

const getWebMentionBySource = async (source) => {
    try {

        const response = await client.query(
            query.Map(
                query.Paginate(
                    query.Match(
                        query.Index("mentionsBySource"), source
                    )
                ),
                query.Lambda("mentions", query.Get((query.Var("mentions"))))
            )
        )

        if (response.data && response.data.length > 0) {
            return mapResponse(response.data[0])
        }
    } catch (err) {
        console.log(err)
    }

    return undefined
}

const createMention = async (webmention) {

    // Save author photo to Cloudinary
    const uploadAsset = async (imagePath) => {
        try {
            return await cloudinary.v2.uploader.upload(imagePath, {
                'mentions'
        });
        } catch (err) {
            console.log(
                // eslint-disable-line no-console
                `$cloudinary.uploadAsset error.\nfolder: ${folder}`,
                err
            )
            return null
        }
    }

    const ext = webmention.author.photo.split(".").pop();

    const authorPhoto = await uploadAsset(webmention.author.photo)

    if (authorPhoto) {
        webmention.author.photo = authorPhoto.secure_url
            .replace("upload/", `upload/w_${src},c_scale,f_auto/`)
            .replace(`.${ext}`, ".webp")
    }

    // Create webmention
    try {
        const response = await this.client.query(
            query.Create(query.Collection("mentions"), {
                data: webmention
            })
        )
    }
    catch (err) {
        console.log(err)
    }

    return savedUser
}

