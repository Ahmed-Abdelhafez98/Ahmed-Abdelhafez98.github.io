import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string(),
    pubDate: z.coerce.date(),
    stack: z.array(z.string()),
    repo: z.string().url(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    location: z.string(),
    period: z.string(),
    pubDate: z.coerce.date(),
    summary: z.string(),
  }),
});

export const collections = { projects, experience };
