import z from 'zod';

export const everytimeUrlSchema = z.object({
  url: z.string().min(1),
});
