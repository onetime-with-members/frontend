export interface Time {
  time_point: string;
  times: string[];
}

export interface Schedules {
  name: string;
  schedules: Time[];
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
