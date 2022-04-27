## 👋 Hi! I'm Michael.

I've been a developer for a little more than 20 years (yeah, that means I'm old,)
but I **LOVE** this stuff! The best part of being a developer is constantly
learning new things and sharing those with others. By day I'm the Head of
Developer Relations at [Deepgram](https://deepgram.com) where I get to play with
cool APIs and I spend a lot of time writing, recording, and streaming content
that hopefully helps you become a better developer.

{{#streams}}

### 📽️ Most Recent Live-stream

<iframe
    src="https://player.twitch.tv/?video=v{{id}}&parent=github.com"
    height="320px"
    style="aspect-ratio=16/9"
    allowfullscreen>
</iframe>
{{/streams}}

### 📝 Recent Blog Posts

{{#posts}}
[{{title}}]({{link}})

{{/posts}}

### 📽️ Random Twitch Clips

<table>
  <tr>
    {{#clips}}
    <td>
      <a href="{{url}}">
        <img src="{{thumbnail}}" alt="{{title}}"/>
      </a>
    </td>
    {{/clips}}
  </tr>
</table>

### 📺 Recent YouTube Videos

<table>
  <tr>
    {{#videos}}
    <td>
      <a href="{{link}}">
        <img src="{{thumbnail}}" alt="{{title}}"/>
      </a>
    </td>
    {{/videos}}
  </tr>
</table>
