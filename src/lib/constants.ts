import {
  EventFormType,
  OnboardingFormType,
  PolicyFormType,
} from './validation/form-types';
import { BarBanner } from '@/features/banner/types';
import { EventType, RecommendScheduleType } from '@/features/event/types';
import { ScheduleType } from '@/features/schedule/types';

export const SERVER_API_URL =
  process.env.SERVER_API_URL ||
  process.env.NEXT_PUBLIC_SERVER_API_URL ||
  'http://localhost:3000';
export const CRAWLING_SERVER_API_URL =
  process.env.CRAWLING_SERVER_API_URL ||
  process.env.NEXT_PUBLIC_CRAWLING_SERVER_API_URL ||
  'http://localhost:3000';
export const CRAWLING_SERVER_API_KEY =
  process.env.CRAWLING_SERVER_API_KEY ||
  process.env.NEXT_PUBLIC_CRAWLING_SERVER_API_KEY ||
  'secretkey';

export const LOCALES = ['ko', 'en'] as const;
export const POLICY_KEY_LIST = ['privacy', 'service'] as const;

export const weekdaysShortKo = ['일', '월', '화', '수', '목', '금', '토'];
export const weekdaysShortEn = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const breakpoint = {
  sm: 640,
  md: 768,
};

export const defaultEvent: EventType = {
  event_id: '',
  title: '',
  start_time: '',
  end_time: '',
  category: 'DATE',
  ranges: [],
  event_status: 'PARTICIPANT',
};

export const defaultEventValue: EventFormType = {
  title: '',
  start_time: '09:00',
  end_time: '24:00',
  category: 'DATE',
  ranges: [],
};

export const defaultRecommendTime: RecommendScheduleType = {
  time_point: '',
  start_time: '',
  end_time: '',
  possible_count: 0,
  possible_names: [],
  impossible_names: [],
};

export const defaultBarBanner: BarBanner = {
  id: 0,
  content_kor: '',
  content_eng: '',
  background_color_code: '',
  text_color_code: '',
  is_activated: false,
  created_date: '',
  link_url: '',
};

export const defaultScheduleDetail: ScheduleType = {
  name: '',
  schedules: [],
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

export const SKELETON_GRAY = '#e8e9ed77';
export const SKELETON_DARK_GRAY = '#dadbe277';
export const SKELETON_TOOLBAR_TITLE_COLOR = '#404251';
export const SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR = '#585a70';
