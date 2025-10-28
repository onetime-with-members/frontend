import { MyEventType, UserType } from '../types';
import {
  OnboardingFormType,
  PolicyFormType,
} from '@/lib/validation/form-types';

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

export const defaultPolicy: PolicyFormType = {
  servicePolicy: true,
  privacyPolicy: true,
  marketingPolicy: true,
};

export const defaultOnboardingValue: OnboardingFormType = {
  nickname: '',
  startSleepTime: '23:00',
  endSleepTime: '07:00',
  servicePolicy: false,
  privacyPolicy: false,
  marketingPolicy: false,
};
