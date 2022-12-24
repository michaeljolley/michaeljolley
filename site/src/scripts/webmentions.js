import { Client, query } from 'faunadb'

const client = new Client({
  secret: import.meta.env.FAUNADBSECRET
})

function mapResponse(payload) {
  return {
    ...payload.data,
    _id: payload.ref.value.id
  }
}

export const getWebMentionsByTarget = async (targetPathname) => {
  try {

    const response = await client.query(
      query.Map(
        query.Paginate(
          query.Match(
            query.Index("mentionsByTarget"), targetPathname
          )
        ),
        query.Lambda("mentions", query.Get((query.Var("mentions"))))
      )
    )

    if (response.data && response.data.length > 0) {
      return response.data.map(d => mapResponse(d))
    }
  } catch (err) {
    console.log(err)
  }

  return []
}