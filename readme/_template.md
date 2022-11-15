# 👋 Hi! I'm Michael.

I've been a developer for a little more than 20 years (yeah, that means I'm old,)
but I **LOVE** this stuff! The best part of being a developer is constantly
learning new things and sharing those with others. By day I'm the Head of
Developer Relations at [Deepgram](https://deepgram.com) where I get to play with
cool APIs and I spend a lot of time writing, recording, and streaming content
that hopefully helps you become a better developer.

## Find Me Everywhere!

[![GitHub followers](https://img.shields.io/github/followers/michaeljolley?style=social)](https://github.com/michaeljolley) [![Twitch Status](https://img.shields.io/twitch/status/baldbeardedbuilder?style=social)](https://twitch.tv/baldbeardedbuilder) [![Twitter Follow](https://img.shields.io/twitter/follow/michaeljolley?style=social)](https://twitter.com/michaeljolley) [![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCn2FoDbv_veJB_UbrF93_jw?style=social)](https://youtube.com/baldbeardedbuilder) [![Discord](https://img.shields.io/discord/565665509350178827)](https://discord.gg/XSG7HJm)

{{#streams}}
## 📽️ Most Recent Live-stream

<a href="{{{url}}}" target="_blank">
  <h3>{{title}}</h3>
  <img src="{{{thumbnail}}}" alt="{{title}}"/>
</a>

---

{{/streams}}

## 📝 Recent Blog Posts

{{#posts}}
[{{title}}]({{{link}}})

{{/posts}}

---

## 📽️ Random Twitch Clips

<table>
  <tr>
    {{#clips}}
    <td>
      <a href="{{{url}}}" target="_blank">
        <img src="{{{thumbnail}}}" alt="{{title}}"/>
      </a>
    </td>
    {{/clips}}
  </tr>
</table>

---

## 📺 Recent YouTube Videos

<table>
  <tr>
    {{#videos}}
    <td>
      <a href="{{{link}}}" target="_blank">
        <img style="align=center" src="{{{thumbnail}}}" alt="{{title}}"/>
      </a>
    </td>
    {{/videos}}
  </tr>
</table>
