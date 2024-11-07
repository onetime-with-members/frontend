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

export interface MyNewSchedule {
  title: string;
  schedules: {
    time_point: string;
    times: string[];
  }[];
}

export interface MySchedule {
  id: number;
  start_time: string;
  end_time: string;
  schedules: {
    time_point: string;
    times: string[];
  }[];
}

export interface TimeBlockDragIndex {
  start: number;
  end: number;
  min: number;
  max: number;
  totalMin: number;
  totalMax: number;
}

export interface TimeBlockPopUpData {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}
