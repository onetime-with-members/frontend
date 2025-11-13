import { ScheduleType, TimeBlockPopUpDataType } from '../types';

export const defaultMemberLoginValues = {
  nickname: '',
  pin: '----',
};

export const defaultGuestValues = {
  isNewGuest: false,
  guestId: '',
  name: '',
  pin: '',
};

export const defaultScheduleDetail: ScheduleType = {
  name: '',
  schedules: [],
};

export const defaultTimeBlockPopUpData: TimeBlockPopUpDataType = {
  timePoint: '',
  time: '',
  members: {
    possible: [],
    impossible: [],
  },
};
