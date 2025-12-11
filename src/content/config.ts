import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().default('webradio_post'),
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    audio_file: z.string(),
    rating: z.number().min(1).max(5).optional(),
  }),
});

export const collections = { blog };
