import z from 'zod';

import {
  eventSchema,
  everytimeUrlSchema,
  profileNicknameSchema,
} from './schema';

export type ProfileNicknameFormType = z.infer<typeof profileNicknameSchema>;
export type EverytimeUrlFormType = z.infer<typeof everytimeUrlSchema>;
export type EventFormType = z.infer<typeof eventSchema>;
