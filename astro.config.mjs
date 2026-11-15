// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages: the site lives at https://<username>.github.io/gaming-finance/
// When a custom domain is added, set `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://GITHUB_USERNAME.github.io',
  base: '/gaming-finance',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
