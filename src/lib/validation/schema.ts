import z from 'zod';

import validationCodes from './codes';

const { profileNickname } = validationCodes;

export const profileNicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { error: profileNickname.MIN })
    .max(50, { error: profileNickname.MAX })
    .refine((value) => (value ? /^[\p{L} ]+$/u.test(value) : true), {
      error: profileNickname.REGEX,
    }),
});

export type ProfileNicknameSchema = z.infer<typeof profileNicknameSchema>;
