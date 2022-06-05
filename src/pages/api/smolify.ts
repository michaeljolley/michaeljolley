import type { APIContext } from 'astro';
import { Client, query } from 'faunadb';


const client = new Client({
  secret: process.env.FAUNADBSECRET
})

export async function get({ params, request }: APIContext) {

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

const getLongUrl = async (path): Promise<ShortUrl | undefined> => {
	// Lookup path in FaunaDb & get the longUrl if it exists
	try {

		const response = await client.query<FaunaResponse>(
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
			const shortUrl = mapResponse<ShortUrl>(response.data[0] as FaunaDocument)
			await recordVisit(shortUrl)
			return shortUrl
		}
	} catch (err) {
		console.log(err)
	}

	return undefined
}

const recordVisit = async (shortUrl: ShortUrl): Promise<void> => {
	// Save the updated visit count to Fauna
	try {
		shortUrl.visits++

		await client.query<FaunaDocument>(
          query.Replace(query.Ref(query.Collection("ShortyMcShortLink"), shortUrl._id), {
            data: shortUrl
          })
        )
	} catch (err) {
		console.log(err)
	}
}

function mapResponse<T>(payload: FaunaDocument): T {
	return {
		...payload.data,
		_id: payload.ref.value.id
	} as unknown as T
}

type ShortUrl = {
	_id: string;
	source: string;
	target: string;
	visits: number;
}

interface FaunaResponse {
  data: FaunaDocument[] | [string[]]
}

interface FaunaDocument {
  ref: FaunaRef
  data: Record<string, unknown>
}

interface FaunaRef {
  value: RefValue
}
interface RefValue {
  id: string
}
