import { EventType } from '../types';
import { EventFormType } from '@/lib/validation/form-types';

export const EDITED_EVENTS_COOKIE_KEY = 'edited_events';

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
