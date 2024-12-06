import dayjs from 'dayjs';

export const weekdaysShortLowerEn = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

export function sortWeekdayList(weekdayList: string[]) {
  return dayjs.weekdaysMin().filter((weekday) => weekdayList.includes(weekday));
}
