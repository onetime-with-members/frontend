import { ScheduleType } from '../types';

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
