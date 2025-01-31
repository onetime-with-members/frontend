export interface Time {
  time_point: string;
  times: string[];
}

export interface Schedule {
  name: string;
  schedules: Time[];
}

export interface RecommendSchedule {
  time_point: string;
  start_time: string;
  end_time: string;
  possible_count: number;
  possible_names: string[];
  impossible_names: string[];
}

export interface MySchedule {
  time_point: string;
  times: string[];
}

export interface TimeBlockPopUpData {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}
