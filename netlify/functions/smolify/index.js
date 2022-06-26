
import { Client, query } from 'faunadb';

const client = new Client({
  secret: process.env.FAUNADBSECRET
})

export async function get({ params, request }) {

  const shortUrl = await getLongUrl(params.path)
  const redirectUrl = shortUrl ? shortUrl.target : 'https://baldbeardedbuilder.com/'

  return {
    statusCode: 302,
    headers: {
      location: redirectUrl,
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify({}),
  }
}

const getLongUrl = async (path) => {
  // Lookup path in FaunaDb & get the longUrl if it exists
  try {

    const response = await client.query < FaunaResponse > (
      query.Map(
        query.Paginate(
          query.Match(
            query.Index("shortyMcShortLinkBySource"), path
          )
        ),
        query.Lambda("ShortyMcShortLink", query.Get((query.Var("ShortyMcShortLink"))))
      )
    )

    if (response.data && response.data.length > 0) {
      const shortUrl = mapResponse(response.data[0])
      await recordVisit(shortUrl)
      return shortUrl
    }
  } catch (err) {
    console.log(err)
  }

  return undefined
}


const recordVisit = async (shortUrl) => {
  // Save the updated visit count to Fauna
  try {
    shortUrl.visits++

    await client.query < FaunaDocument > (
      query.Replace(query.Ref(query.Collection("ShortyMcShortLink"), shortUrl._id), {
        data: shortUrl
      })
    )
  } catch (err) {
    console.log(err)
  }
}

function mapResponse(payload) {
  return {
    ...payload.data,
    _id: payload.ref.value.id
  }
}