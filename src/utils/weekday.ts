import dayjs from 'dayjs';

export const weekdaysShortKo = ['일', '월', '화', '수', '목', '금', '토'];
export const weekdaysShortEn = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export function sortWeekdayList(weekdayList: string[]) {
  return dayjs
    .weekdaysShort()
    .filter((weekday) => weekdayList.includes(weekday));
}

export function translateWeekdayShort(weekday: string) {
  return {
    월: 'Mon',
    화: 'Tue',
    수: 'Wed',
    목: 'Thu',
    금: 'Fri',
    토: 'Sat',
    일: 'Sun',
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
    Sun: '일',
  }[weekday];
}

export function expandWeekdayShort(weekday: string) {
  return {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
    월: '월요일',
    화: '화요일',
    수: '수요일',
    목: '목요일',
    금: '금요일',
    토: '토요일',
    일: '일요일',
  }[weekday];
}
