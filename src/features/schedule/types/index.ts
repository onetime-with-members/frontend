export interface TimeType {
  time_point: string;
  times: string[];
}

export interface ScheduleType {
  name: string;
  schedules: TimeType[];
}

export interface TimeBlockPopUpDataType {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}

export interface GuestValueType {
  isNewGuest: boolean;
  guestId: string;
  name: string;
  pin: string;
}
