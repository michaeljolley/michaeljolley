---
date: 2022-07-18
title: "Creating Short URLs with Netlify Functions and FaunaDb"
description: Creating a personalized short URL service using Netlify functions and FaunaDb.
tags: ["netlify", "faunadb", "serverless"] 
summary: Personalized short URLs are cool. So I decided to see if I could use a serverless function to do it for me.
setup: |
  import Image from '../../../../components/Image.astro'
---

Personalized short URLs look so cool. Sure, I could use a service like Bitly.
They even provide the ability to use your own domain. But I love building things,
even when I don't need to. It gives me the opportunity to explore and learn new
things.

I realized I needed a short URL when I started sharing posts from my personal
website, baldbeardedbuilder.com. It's a long one, and that's not considering
slugs. So I went on the hunt for something super short and found bbb.dev. It's
perfect! I purchased it quick and got to work.

## Storing URLs

First up was keeping up with the short/long URL pairs. I knew I'd be looking for
a database, and having used [Fauna](https://fauna.com) in the past, I decided it
would work well for this application. My site doesn't get a lot of traffic, so I
expected their free tier to cover me.

> **Update:** this function has been running for well over a year and I still don't
come close to fully utilizing Fauna's free tier.

### Data Structure

In my Fauna account, I created a new database named `smolify` with a collection
named `ShortyMcShortLink`. Why those names? Because I like to think my dad-joke
brain is clever. 😁

Next I added an initial record. I knew it needed a short-code and a full URL,
but I also thought it would be cool to track how many visits that short URL had
been used. So I added a visits property to keep track of that. My first short
URL would be used for the BBB community code of conduct and looked like the
following:

```js
{
  "source": "coc",
  "target": "https://baldbeardedbuilder.com/code-of-conduct/",
  "visits": 0
}
```

Whenever I need a new short URL, I log into Fauna and create a new document in
that format with the corresponding `source` and `target`.

### Retrieving Data

Now that data lives in my collection, I need a way to grab specific records
based on the `source` property. To do that, I created an index named
`shortyMcShortLinkBySource`. Again, I apologize for my dad-joke inspired naming
conventions. 🙄

That index has one 'term' that it watches; the `source` property.

## Creating the Netlify Function

Once the database was ready, I could move to creating a serverless function to
retrieve and update data. My site is currently hosted on
[Netlify](https://netlify.com), so their functions seemed like a great place to
start.

I created a new JavaScript file named `smolify.js` and added my dependencies.

```js
import { Client, query } from 'faunadb';
require('dotenv').config()

exports.handler = async (event) => {
 
}
```

### Finding the Short Code

I can get all I need from the `event` parameter and I'll return a `302` status
to tell the user's browser to redirect to the long URL. But first, I need to
find the short code and get the long URL. To do that, I created the `getLongUrl`
function. It takes a path (in this case, the short-code) and finds it in the
index we previously setup.

I perform a little mapping to make it easier to identify the `id` assigned by
Fauna for later use and then return the record Fauna found. If anything goes
wrong I return undefined.

```js
const getLongUrl = async (path) => {
 try {

  const response = await client.query(
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
   return shortUrl
  }
 } catch (err) {
  console.log(err)
 }

 return undefined
}

function mapResponse(payload) {
 return {
  ...payload.data,
  _id: payload.ref.value.id
 }
}
```

### Counting Visits

Before I send the result back to the browser, I want to record the visit to
Fauna. To do that, I created the `recordVisit` function below. It increments
the visit count that Fauna provided and then replaces that object based on the
Fauna `id` that we mapped.

```js
const recordVisit = async (shortUrl) => {
	try {
		shortUrl.visits++

		await client.query(
			query.Replace(query.Ref(query.Collection("ShortyMcShortLink"), shortUrl._id), {
				data: shortUrl
			})
		)
	} catch (err) {
		console.log(err)
	}
}
```

Then we update the `getLongUrl` function to add a call to `recordVisit` between
mapping and returning it.

```js {2}
const shortUrl = mapResponse(response.data[0])
await recordVisit(shortUrl)
return shortUrl
```

### Finishing Our Function

Now that our JavaScript is ready, let's add it to the handler function. First,
we'll call the `getLongUrl` function with the `event.queryStringParameters.path`.
We'll handle changing `/coc` to `/?path=coc` later.

If we were able to find a short URL, we'll set the `redirectUrl` property to its
`target` URL property. If we returned undefined, we'll redirect the person to
the homepage of baldbeardedbuilder.com.

```js
exports.handler = async (event, context) => {
	const shortUrl = await getLongUrl(event.queryStringParameters.path)
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
```

## Configuring Netlify

Now we need to redirect all the traffic to the short URL to our function. Start
by adding the domain to your Netlify application. Once it's setup and sending
traffic to your site, it's time to setup the redirect on Netlify.

### Redirecting the Short URL

In the root of your site, add a `netlify.toml` file. Then add the following
snippet:

```yaml
[[redirects]]
  from = "https://bbb.dev/*"
  to = "/.netlify/functions/smolify?path=:splat"
  status = 301
  force = true
```

This takes all traffic to `https://bbb.dev` and redirects it to the `smolify`
function. When redirecting, it adds the splat from the `from` filter as a
querystring parameter named `path`.

Remember the `path` parameter we're grabbing in our function? This is where it's
coming from.

## Wrap Up

All that's left is deploying to your site. All traffic to your short URL will be
redirected to your function. Now you can add as many short codes to your Fauna
database and they'll immediately be active on your site.
