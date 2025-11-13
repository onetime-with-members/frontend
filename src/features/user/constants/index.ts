import {
  MyEventType,
  OnboardingSchema,
  PolicySchema,
  UserType,
} from '../types';

export const defaultUser: UserType = {
  nickname: '',
  email: '',
  language: 'ENG',
  social_platform: 'google',
};

export const defaultMyEvent: MyEventType = {
  title: '',
  participant_count: 0,
  created_date: '',
  event_id: '',
  category: 'DATE',
  most_possible_times: [],
};

export const defaultPolicy: PolicySchema = {
  servicePolicy: true,
  privacyPolicy: true,
  marketingPolicy: true,
};

export const defaultOnboardingValue: OnboardingSchema = {
  nickname: '',
  startSleepTime: '23:00',
  endSleepTime: '07:00',
  servicePolicy: false,
  privacyPolicy: false,
  marketingPolicy: false,
};

export const nicknameSchemaCodes = {
  MIN: 'MIN',
  MAX: 'MAX',
  REGEX: 'REGEX',
};
