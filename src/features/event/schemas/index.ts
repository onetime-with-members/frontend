import z from 'zod';

import { nicknameSchema } from '@/features/user/schemas';
import dayjs from '@/lib/dayjs';

export const eventSchema = z
  .object({
    title: z.string().trim().min(1).max(50),
    start_time: z.iso.time(),
    end_time: z.union([z.iso.time(), z.literal('24:00')]),
    category: z.literal(['DATE', 'DAY']),
    ranges: z.array(z.string()).min(1),
  })
  .refine(({ start_time, end_time }) =>
    dayjs(start_time, 'HH:mm').isBefore(dayjs(end_time, 'HH:mm')),
  );

export const guestSchema = z.object({
  nickname: nicknameSchema,
  pin: z
    .string()
    .length(4)
    .refine((value) => /^\d+$/.test(value)),
});
