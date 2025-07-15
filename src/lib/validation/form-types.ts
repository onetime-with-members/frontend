import z from 'zod';

import {
  eventSchema,
  everytimeUrlSchema,
  guestSchema,
  profileNicknameSchema,
} from './schema';

export type ProfileNicknameFormType = z.infer<typeof profileNicknameSchema>;
export type EverytimeUrlFormType = z.infer<typeof everytimeUrlSchema>;
export type EventFormType = z.infer<typeof eventSchema>;
export type GuestFormType = z.infer<typeof guestSchema>;
