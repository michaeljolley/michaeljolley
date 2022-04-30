---
date: 2022-05-02
title: Updating Notion Cover Images with Pipedream and JavaScript
description: Using JavaScript and Pipedream to automate changing my Notion cover image each night.
tags: ["notion", "javascript", "pipedream"] 
summary: Using JavaScript and Pipedream to automate changing my Notion cover image each night.
setup: |
  import Image from '../../../../components/Image.astro'
---

Okay. I admit it. I apparently have commitment issues. Well, at least when it
comes to cover images on my Notion dashboards. I've tried to pick images that
are aesthetically appealing, but I tend to get bored looking at the same thing
day after day. 

## A Cry for Help

Now don't get me wrong, I'm just starting my journey with Notion. I've dabbled
with it multiple times but it always seemed like just another "note-taking" app.
Then I started seeing posts on Twitter from folks like
[Kurt Kemple](https://twitter.com/theworstdev). It was clear that I was missing
something. Every tweet or blog post I read made me realize I was fundamentally
misunderstanding what Notion is. So I put out a cry for help on Twitter. 

<Image src="./image-of-initial-tweet-for-notion-help.png" alt="Image of tweet I sent asking for Notion help" style="width: 80%;margin:auto;"/>

Luckily, Kurt came to my rescue and spent more than an hour showing me how he
uses Notion to power his personal and professional life. To say it was
eye-opening would be an understatement. Weeks later, I'm still remembering
things he showed me and implementing them myself. 

On top of all those databases and pages is a dashboard that I run my day from,
but I wanted a cool image across the top of the page. After realizing I'd never
find just the "right" picture, I remembered some of the things Kurt taught me,
like modifying things in Notion using JavaScript and
[Pipedream](https://pipedream.com/).

Now that you know the why, let's get to the how-to.

## What You'll Need

It could probably go without saying, but you'll need
[Notion](https://www.notion.so/) and [Pipedream](https://pipedream.com/)
accounts. Once you've got those, you'll need a page that you want to change. Of
course, you could do this for multiple pages, but for brevity, this tutorial
will show you how to do one.

### Gather Notion Info

Now that you've got a Notion account and have decided on a page to update, we'll
need to get the id of that page. If you're looking at the page in a browser, you
can get the id from the URL. If you're using the Notion app, you can right click
on the page in the menu on the right and choose "Copy link". Then paste the link
to see it.

<Image src="./notion-app-context-menu.png" alt="Browser address bar showing a Notion Url" style="width: 80%;margin:auto;"/>

In the URL, you want the alphanumeric string after your Notion workspace name.
Sometimes the URL has the page name prepended to the id. That's the case in the
image below (`Hello-World-5b1db5ba47e64a6b958c4a8a71f5677b`). You'll want to
ignore the page name and dashes in the URL. Removing that leaves the actual id
of the page (`5b1db5ba47e64a6b958c4a8a71f5677b`).

<Image src="./notion-browser-address-bar.png" alt="Browser address bar showing a Notion Url" style="width: 80%;margin:auto;"/>

Now that we have the Notion page id, we can move forward to setting up Pipedream.

## Creating the Pipedream Workflow