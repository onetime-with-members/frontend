import dayjs from 'dayjs';

export function sortWeekdayList(weekdayList: string[]) {
  return dayjs.weekdaysMin().filter((weekday) => weekdayList.includes(weekday));
}
