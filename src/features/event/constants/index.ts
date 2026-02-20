import { EventSchema, EventType } from '../types';

export const EDITED_EVENTS_COOKIE_KEY = 'edited_events';

export const TALK_CALENDAR_SUCCESS = 'talk_calendar_success';
export const TALK_CALENDAR_ERROR = 'talk_calendar_error';

export const bottomSheetHeight = {
  all: 500,
  peek: 150,
  collapsed: 350,
};

export const defaultEvent: EventType = {
  event_id: '',
  title: '',
  start_time: '',
  end_time: '',
  category: 'DATE',
  ranges: [],
  participation_role: 'PARTICIPANT',
  event_status: 'ACTIVE',
  confirmation: null,
};

export const defaultEventValue: EventSchema = {
  title: '',
  start_time: '09:00',
  end_time: '24:00',
  category: 'DATE',
  ranges: [],
};

export const defaultConfirmedTime = {
  start_date: null,
  end_date: null,
  start_day: null,
  end_day: null,
  start_time: '',
  end_time: '',
  created_date: '',
};
