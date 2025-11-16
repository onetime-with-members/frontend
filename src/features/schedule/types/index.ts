export type TimeBlockUnit = '30m' | '1h';

export interface TimeType {
  time_point: string;
  times: string[];
}

export interface ScheduleType {
  name: string;
  schedules: TimeType[];
}

export interface ClickedTimeBlock {
  startTime: string;
  endTime: string;
  timePoint: string;
}

export interface TimeBlockPopUpDataType {
  timePoint: string;
  time: string;
  members: { possible: string[]; impossible: string[] };
}

export type TimeBlockPopUpOpenProps = Omit<TimeBlockPopUpDataType, 'members'>;

export interface GuestValueType {
  isNewGuest: boolean;
  guestId: string;
  name: string;
  pin: string;
}

export interface GuideContents {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}
