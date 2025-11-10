import z from 'zod';

import {
  onboardingSchema,
  policySchema,
  profileNicknameSchema,
} from '../schemas';

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface UserType {
  nickname: string;
  email: string;
  language: 'KOR' | 'ENG';
  social_platform: 'google' | 'naver' | 'kakao';
}

export interface MyEventType {
  title: string;
  participant_count: number;
  created_date: string;
  event_id: string;
  category: 'DATE' | 'DAY';
  most_possible_times: {
    time_point: string;
    start_time: string;
    end_time: string;
  }[];
}

export type TabActiveType = 'events' | 'schedules' | 'profile' | null;

export type PageTitleType = string | null;

export interface OnboardingType extends OnboardingSchema {
  registerToken: string;
  language: 'KOR' | 'ENG';
}

export type ProfileNicknameSchema = z.infer<typeof profileNicknameSchema>;
export type PolicySchema = z.infer<typeof policySchema>;
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
