import z from 'zod';

import {
  eventSchema,
  everytimeUrlSchema,
  guestSchema,
  policySchema,
  profileNicknameSchema,
} from './schema';

export type ProfileNicknameFormType = z.infer<typeof profileNicknameSchema>;
export type PolicyFormType = z.infer<typeof policySchema>;
export type EverytimeUrlFormType = z.infer<typeof everytimeUrlSchema>;
export type EventFormType = z.infer<typeof eventSchema>;
export type GuestFormType = z.infer<typeof guestSchema>;
