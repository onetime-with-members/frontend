import { AxiosError } from 'axios';

import { OnboardingFormType } from './validation/form-types';

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

export type EverytimeSchedule = TimeType[];

export interface TimeBlockPopUpDataType {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}

export interface GuestValueType {
  isNewGuest: boolean;
  guestId: string;
  name: string;
  pin: string;
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
