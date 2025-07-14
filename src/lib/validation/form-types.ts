import z from 'zod';

import { everytimeUrlSchema, profileNicknameSchema } from './schema';

export type ProfileNicknameFormType = z.infer<typeof profileNicknameSchema>;
export type EverytimeUrlFormType = z.infer<typeof everytimeUrlSchema>;
