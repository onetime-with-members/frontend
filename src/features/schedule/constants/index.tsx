import {
  ScheduleGuideModalViewLog,
  ScheduleType,
  TimeBlockPopUpDataType,
} from '../types';

export const SCHEDULE_GUIDE_MODAL = 'schedule-guide-modal';

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

export const defaultScheduleGuideModalViewLog: ScheduleGuideModalViewLog = {
  is_viewed: true,
};
