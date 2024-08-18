export interface Schedule {
  day: string;
  time: string[];
}

export interface ScheduleAll {
  name: string;
  day_schedules: {
    day: string;
    times: string[];
  }[];
}
