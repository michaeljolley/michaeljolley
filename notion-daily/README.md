# Update Notion Contacts

This folder contains the code (excluding the GitHub Action) to update the
profile pictures of contacts in my personal Notion database.

![Image of my Notion contacts database with contact images displayed](https://github.com/michaeljolley/michaeljolley/assets/1228996/c5603cb0-d8fd-451b-a9ed-52bc8d4af698)

Each Sunday morning, the GitHub Action iterates through every contact in my
Notion database that has GitHub and/or Twitter usernames. For each, it attempts
to get the contacts profile picture from their GitHub account first. If not
found, it will attempt to get the profile picture from their Twitter account. If
the profile picture is different than the current picture in Notion, it attempts
to update the Notion contact with the new profile picture.  