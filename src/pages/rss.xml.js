import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../content/**/*.md', { eager: true });
const posts = Object.values(postImportResult);

export const get = () => rss({
    title: 'Bald Bearded Builder',
    description: 'Home of Michael Jolley, the bald bearded builder, this site contains a collection of all blog posts, YouTube videos, Twitch streams, conference talks and more that Michael has generated.',
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
        link: `${post.file.split('/').slice(-2)[0]}/`,
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        pubDate: post.frontmatter.pubDate,
    }))
});