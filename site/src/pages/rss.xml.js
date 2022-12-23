import rss from "@astrojs/rss";

export const get = () =>
  rss({
    title: "Bald Bearded Builder",
    description:
      "Home of Michael Jolley, the bald bearded builder, this site contains a collection of all blog posts, YouTube videos, Twitch streams, conference talks and more that Michael has generated.",
    site: import.meta.env.SITE,
    items: import.meta.glob("./**/*.md"),
    customData: `<language>en-us</language>`,
  });
