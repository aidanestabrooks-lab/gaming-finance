import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE, url } from '../consts';

export async function GET(context: APIContext) {
  const projects = (await getCollection('projects', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: new URL(import.meta.env.BASE_URL, context.site).toString(),
    items: projects.map((p) => ({
      title: `Week ${p.data.week}: ${p.data.title}`,
      pubDate: p.data.date,
      description: p.data.summary,
      link: url(`/projects/${p.id}`),
      categories: [...p.data.tags],
    })),
    customData: '<language>en-us</language>',
  });
}
