import { getCollection } from 'astro:content';

export type Post = {
  title: string;
  summary: string;
  href: string;
  pubDate: Date;
  kind: 'Project' | 'Experience';
  meta: string;
};

export async function allPosts(): Promise<Post[]> {
  const [projects, experience] = await Promise.all([
    getCollection('projects'),
    getCollection('experience'),
  ]);
  const posts: Post[] = [
    ...projects.map((p) => ({
      title: p.data.title,
      summary: p.data.summary,
      href: `/projects/${p.id}/`,
      pubDate: p.data.pubDate,
      kind: 'Project' as const,
      meta: p.data.period,
    })),
    ...experience.map((e) => ({
      title: e.data.title,
      summary: e.data.summary,
      href: `/experience/${e.id}/`,
      pubDate: e.data.pubDate,
      kind: 'Experience' as const,
      meta: `${e.data.company} · ${e.data.period}`,
    })),
  ];
  return posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
}
