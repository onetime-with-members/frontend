import z from 'zod';

import {
  eventSchema,
  everytimeUrlSchema,
  guestSchema,
  onboardingSchema,
  policySchema,
  profileNicknameSchema,
} from './schema';

export type ProfileNicknameFormType = z.infer<typeof profileNicknameSchema>;
export type PolicyFormType = z.infer<typeof policySchema>;
export type OnboardingFormType = z.infer<typeof onboardingSchema>;
export type EverytimeUrlFormType = z.infer<typeof everytimeUrlSchema>;
export type EventFormType = z.infer<typeof eventSchema>;
export type GuestFormType = z.infer<typeof guestSchema>;
