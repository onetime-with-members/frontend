import z from 'zod';

import { eventSchema, guestSchema } from '../schemas';
import { ScheduleType } from '@/features/schedule/types';

export type EventFormStatus = 'create' | 'edit';

export interface EventType {
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
  event_status: 'ACTIVE' | 'CONFIRMED';
  participation_role: 'CREATOR' | 'PARTICIPANT' | 'CREATOR_AND_PARTICIPANT';
  confirmation: ConfirmedEventData | null;
}

export interface ExampleEventType {
  slug: string;
  event: EventType;
  shortUrl: string;
  qrCode: string;
  participants: ParticipantType[];
  schedules: ScheduleType[];
  recommendedTimes: RecommendedScheduleType[];
}

export interface MemberFilterType {
  users: number[];
  guests: number[];
}

export interface ParticipantResponseType {
  id: number;
  name: string;
}

export interface ParticipantType extends ParticipantResponseType {
  type: 'GUEST' | 'USER';
}

export interface RecommendedScheduleType {
  time_point: string;
  start_time: string;
  end_time: string;
  possible_count: number;
  possible_names: string[];
  impossible_names: string[];
}

export type EventSchema = z.infer<typeof eventSchema>;
export type GuestSchema = z.infer<typeof guestSchema>;

export interface ConfirmedEventData {
  start_date: string | null;
  end_date: string | null;
  start_day: string | null;
  end_day: string | null;
  start_time: string;
  end_time: string;
  created_date: string;
}

export type ConfirmEventRequestData = {
  start_time: string;
  end_time: string;
} & (
  | { start_date: string; end_date: string }
  | {
      start_day: string;
      end_day: string;
    }
);

export interface SelectedDateTime {
  start: {
    date: string;
    time: string;
  };
  end: {
    date: string;
    time: string;
  };
}
