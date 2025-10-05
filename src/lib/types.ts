import { AxiosError } from 'axios';

import { OnboardingFormType } from './validation/form-types';

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export type ExtendedAxiosError = AxiosError & {
  response: {
    status: number;
    data: { code: string };
  };
  config: AxiosError & { _retry: boolean };
};

export interface EventType {
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
  event_status: 'CREATOR' | 'PARTICIPANT';
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

export interface ParticipantResponseType {
  id: number;
  name: string;
}

export interface ParticipantType extends ParticipantResponseType {
  type: 'GUEST' | 'USER';
}

export interface MemberFilterType {
  users: number[];
  guests: number[];
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
  isNewGuest: boolean;
  guestId: string;
  name: string;
  pin: string;
}

export interface SleepTimeType {
  sleep_start_time: string;
  sleep_end_time: string;
}

export interface OnboardingType extends OnboardingFormType {
  registerToken: string;
  language: 'KOR' | 'ENG';
}

export interface Banner {
  id: number;
  organization: string;
  title: string;
  sub_title: string;
  button_text: string;
  color_code: string;
  image_url: string;
  is_actived: boolean;
  created_date: string;
  link_url: string;
  click_count: number;
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
