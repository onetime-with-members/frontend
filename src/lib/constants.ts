import { EventValueType, MyEventType } from '@/lib/types';
import { RecommendScheduleType as RecommendTimeType } from '@/lib/types';

export const SERVER_API_URL =
  process.env.SERVER_API_URL || 'http://localhost:3000';

export const LOCALES = ['ko', 'en'] as const;

export const POLICY_KEY_LIST = ['privacy', 'service'] as const;

export const breakpoint = {
  sm: 640,
  md: 768,
};

export const defaultEventValue: EventValueType = {
  title: '',
  start_time: '09:00',
  end_time: '24:00',
  category: 'DATE',
  ranges: [],
};

export const defaultMyEvent: MyEventType = {
  title: '',
  participant_count: 0,
  created_date: '',
  event_id: '',
  category: 'DATE',
  most_possible_times: [],
};

export const defaultRecommendTime: RecommendTimeType = {
  time_point: '',
  start_time: '',
  end_time: '',
  possible_count: 0,
  possible_names: [],
  impossible_names: [],
};

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

export const SKELETON_GRAY = '#e8e9ed77';
export const SKELETON_DARK_GRAY = '#dadbe277';
export const SKELETON_TOOLBAR_TITLE_COLOR = '#404251';
export const SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR = '#585a70';
