import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { TAGS } from './consts';

const chartSchema = z.object({
  title: z.string(),
  type: z.enum(['line', 'bar']),
  labels: z.array(z.string()).min(1),
  series: z
    .array(
      z.object({
        name: z.string(),
        data: z.array(z.number()),
      }),
    )
    .min(1),
  note: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    week: z.number().int().positive(),
    tags: z.array(z.enum(TAGS)).min(1),
    summary: z.string(),
    takeaways: z.array(z.string()).min(1),
    sources: z
      .array(z.object({ title: z.string(), url: z.string().url() }))
      .default([]),
    charts: z.array(chartSchema).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
