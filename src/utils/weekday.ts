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

export const weekdaysShort = Array.from(
  {
    length: 7,
  },
  (_, i) => dayjs().day(i).format('ddd'),
);

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
