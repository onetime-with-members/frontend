import { exampleEventList } from '../mocks/example-events';
import { ConfirmedEventData } from '../types';
import { weekdaysShortKo } from '@/constants';
import dayjs from '@/lib/dayjs';

export const foundExampleEvent = (eventId: string) =>
  exampleEventList.find(({ slug }) => slug.includes(eventId));

export const isExampleEventSlug = (eventId: string) =>
  !!foundExampleEvent(eventId);

function parseDateTime(date: string, time: string) {
  return dayjs(`${date} ${time}`, 'YYYY.MM.DD HH:mm');
}

function parseDayTime(day: string, time: string) {
  return dayjs(time, 'HH:mm').day(
    weekdaysShortKo.findIndex((weekday) => weekday === day),
  );
}

export function getConfirmedTimeText(
  {
    start_date: startDate,
    end_date: endDate,
    start_day: startDay,
    end_day: endDay,
    start_time: startTime,
    end_time: endTime,
  }: ConfirmedEventData,
  category: 'DATE' | 'DAY',
) {
  if (category === 'DATE') {
    const startDateTime = parseDateTime(startDate ?? '', startTime);
    const endDateTime = parseDateTime(endDate ?? '', endTime);

    return startDate === endDate
      ? `${startDateTime.format('MM/DD(dd) HH:mm')} - ${endDateTime.format('HH:mm')}`
      : `${startDateTime.format('MM/DD(dd) HH:mm')} - ${endDateTime.format('MM/DD(dd) HH:mm')}`;
  } else {
    const startDayTime = parseDayTime(startDay ?? '', startTime);
    const endDayTime = parseDayTime(endDay ?? '', endTime);

    return startDay === endDay
      ? `${startDayTime.format('dddd HH:mm')} - ${endDayTime.format('HH:mm')}`
      : `${startDayTime.format('dddd HH:mm')} - ${endDayTime.format('dddd HH:mm')}`;
  }
}

export function getConfirmedTimeFromNow(
  {
    start_date: startDate = '',
    start_day: startDay = '',
    start_time: startTime,
  }: ConfirmedEventData,
  category: 'DATE' | 'DAY',
) {
  return category === 'DATE'
    ? parseDateTime(startDate ?? '', startTime).fromNow()
    : parseDayTime(startDay ?? '', startTime)
        .add(1, 'week')
        .fromNow();
}
