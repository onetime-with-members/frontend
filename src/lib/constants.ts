import { MyEventType } from '@/types/event.type';

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
