export type EventFormStatus = 'create' | 'edit';

export interface EventType {
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
  event_status: 'CREATOR' | 'PARTICIPANT';
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

export interface RecommendScheduleType {
  time_point: string;
  start_time: string;
  end_time: string;
  possible_count: number;
  possible_names: string[];
  impossible_names: string[];
}
