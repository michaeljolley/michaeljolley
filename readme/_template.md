## 👋 Hi! I'm Michael.

I've been a developer for a little more than 20 years (yeah, that means I'm old,)
but I **LOVE** this stuff! The best part of being a developer is constantly
learning new things and sharing those with others. By day I'm the Head of
Developer Relations at [Deepgram](https://deepgram.com) where I get to play with
cool APIs and I spend a lot of time writing, recording, and streaming content
that hopefully helps you become a better developer.

{{#streams}}
### 📽️ Most Recent Live-stream

<a href="{{{url}}}">
  <h4>{{title}}</h4>
  <img src="{{{thumbnail}}}" alt="{{title}}"/>
</a>
{{/streams}}

### 📝 Recent Blog Posts

{{#posts}}
[{{title}}]({{{link}}})

{{/posts}}

### 📽️ Random Twitch Clips

<table>
  <tr>
    {{#clips}}
    <td>
      <a href="{{{url}}}">
        <img src="{{{thumbnail}}}" alt="{{title}}"/>
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
      <a href="{{{link}}}">
        <img style="align=center" src="{{{thumbnail}}}" alt="{{title}}"/>
      </a>
    </td>
    {{/videos}}
  </tr>
</table>
