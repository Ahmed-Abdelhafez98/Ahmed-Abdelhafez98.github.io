// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ahmedemad.is-a.dev',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-default' },
  },
});
