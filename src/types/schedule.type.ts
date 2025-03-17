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

export type MyScheduleTimeType = TimeType;

export type EverytimeSchedule = TimeType[];

export interface TimeBlockPopUpDataType {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}
