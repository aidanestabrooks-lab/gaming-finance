// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// GitHub Pages: the site lives at https://<username>.github.io/gaming-finance/
// When a custom domain is added, set `site` to that domain and remove `base`.
export default defineConfig({
  site: 'https://aidanestabrooks-lab.github.io',
  base: '/gaming-finance',
  trailingSlash: 'ignore',
  integrations: [sitemap(), mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
