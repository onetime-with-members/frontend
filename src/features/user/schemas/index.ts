import z from 'zod';

import { nicknameSchemaCodes } from '../constants';

export const nicknameSchema = z
  .string()
  .min(1, { error: nicknameSchemaCodes.MIN })
  .max(50, { error: nicknameSchemaCodes.MAX })
  .refine((value) => (value ? /^[\p{L} ]+$/u.test(value) : true), {
    error: nicknameSchemaCodes.REGEX,
  });

export const profileNicknameSchema = z.object({
  nickname: nicknameSchema,
});

export const policySchema = z.object({
  servicePolicy: z.boolean().refine((value) => value),
  privacyPolicy: z.boolean().refine((value) => value),
  marketingPolicy: z.boolean(),
});

export const onboardingSchema = z.object({
  ...profileNicknameSchema.shape,
  ...policySchema.shape,
  startSleepTime: z.union([z.iso.time(), z.literal('24:00')]),
  endSleepTime: z.union([z.iso.time(), z.literal('24:00')]),
});
