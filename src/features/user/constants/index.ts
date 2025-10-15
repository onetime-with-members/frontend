import { MyEventType, UserType } from '../models';

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
