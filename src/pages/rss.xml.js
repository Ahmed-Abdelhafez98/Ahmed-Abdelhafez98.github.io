import rss from '@astrojs/rss';
import { allPosts } from '../lib/posts';
import { site } from '../data/site';

export async function GET(context) {
  const posts = await allPosts();
  return rss({
    title: `${site.name} — Writing`,
    description: 'Write-ups on projects and past roles.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.title,
      description: p.summary,
      link: p.href,
      pubDate: p.pubDate,
      categories: [p.kind],
    })),
  });
}
