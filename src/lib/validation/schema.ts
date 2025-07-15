import z from 'zod';

import dayjs from '../dayjs';
import validationCodes from './codes';

const { nickname } = validationCodes;

const nicknameSchema = z
  .string()
  .min(1, { error: nickname.MIN })
  .max(50, { error: nickname.MAX })
  .refine((value) => (value ? /^[\p{L} ]+$/u.test(value) : true), {
    error: nickname.REGEX,
  });

export const profileNicknameSchema = z.object({
  nickname: nicknameSchema,
});

export const everytimeUrlSchema = z.object({
  url: z.string().min(1),
});

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
  name: nicknameSchema,
  pin: z
    .string()
    .length(4)
    .refine((value) => /^\d+$/.test(value)),
});
