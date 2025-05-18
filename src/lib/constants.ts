import { MyEventType } from '@/types/event.type';
import { RecommendScheduleType as RecommendTimeType } from '@/types/schedule.type';

export const breakpoint = {
  sm: 640,
  md: 768,
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

export const SKELETON_GRAY = '#e8e9ed77';
export const SKELETON_DARK_GRAY = '#dadbe277';
export const SKELETON_TOOLBAR_TITLE_COLOR = '#404251';
export const SKELETON_TOOLBAR_TITLE_HIGHLIGHT_COLOR = '#585a70';
