export interface EventType {
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
  event_status: 'CREATOR' | 'PARTICIPANT';
}

export interface EventValueType {
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
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

export interface TimeType {
  time_point: string;
  times: string[];
}

export interface ScheduleType {
  name: string;
  schedules: TimeType[];
}

export interface RecommendScheduleType {
  time_point: string;
  start_time: string;
  end_time: string;
  possible_count: number;
  possible_names: string[];
  impossible_names: string[];
}

export type MyScheduleTimeType = TimeType;
export type EverytimeSchedule = TimeType[];

export interface TimeBlockPopUpDataType {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}

export interface UserType {
  nickname: string;
  email: string;
  language: 'KOR' | 'ENG';
  social_platform: 'google' | 'naver' | 'kakao';
}

export interface GuestValueType {
  name: string;
  pin: string;
}

export interface SleepTimeType {
  sleep_start_time: string;
  sleep_end_time: string;
}

export interface PolicyType {
  service_policy_agreement: boolean;
  privacy_policy_agreement: boolean;
  marketing_policy_agreement: boolean;
}

export type PolicyKeyType = keyof PolicyType;

export interface OnboardingValueType extends PolicyType, SleepTimeType {
  register_token: string;
  nickname: string;
  language: 'KOR' | 'ENG';
}

export interface BarBanner {
  id: number;
  content_kor: string;
  content_eng: string;
  background_color_code: string;
  text_color_code: string;
  is_activated: boolean;
  created_date: string;
  link_url: string;
}

export type TabActiveType = 'events' | 'schedules' | 'profile' | null;
