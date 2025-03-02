export interface EventType {
  event_id: string;
  title: string;
  start_time: string;
  end_time: string;
  category: 'DATE' | 'DAY';
  ranges: string[];
  event_status: 'CREATOR' | 'PARTICIPANT';
  shortenUrl: string;
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
