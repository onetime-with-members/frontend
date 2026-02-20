import { exampleEventList } from '../mocks/example-events';
import { ConfirmedEventData } from '../types';
import { weekdaysShortKo } from '@/constants';
import { MyEventType } from '@/features/user/types';
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

function getEventTimeSummary({
  start,
  end,
  category,
}: {
  start: { date: string; day: string; time: string };
  end: { date: string; day: string; time: string };
  category: 'DATE' | 'DAY';
}) {
  if (category === 'DATE') {
    const startDateTime = parseDateTime(start.date, start.time);
    const endDateTime = parseDateTime(end.date ?? '', end.time);

    return start.date === end.date
      ? `${startDateTime.format('MM/DD (dd) HH:mm')} - ${endDateTime.format('HH:mm')}`
      : `${startDateTime.format('MM/DD(dd) HH:mm')} - ${endDateTime.format('MM/DD(dd) HH:mm')}`;
  } else {
    const startDayTime = parseDayTime(start.day, start.time);
    const endDayTime = parseDayTime(end.day, end.time);

    return start.day === end.day
      ? `${startDayTime.format('dddd HH:mm')} - ${endDayTime.format('HH:mm')}`
      : `${startDayTime.format('dddd HH:mm')} - ${endDayTime.format('dddd HH:mm')}`;
  }
}

export function getRecommendedTimeText(
  recommendedTime: MyEventType['most_possible_times'][0],
  category: 'DATE' | 'DAY',
) {
  return getEventTimeSummary({
    start: {
      date: recommendedTime.time_point,
      day: recommendedTime.time_point,
      time: recommendedTime.start_time,
    },
    end: {
      date: recommendedTime.time_point,
      day: recommendedTime.time_point,
      time: recommendedTime.end_time,
    },
    category,
  });
}

export function getConfirmedTimeText(
  confirmedTime: ConfirmedEventData,
  category: 'DATE' | 'DAY',
) {
  return getEventTimeSummary({
    start: {
      date: confirmedTime.start_date ?? '',
      day: confirmedTime.start_day ?? '',
      time: confirmedTime.start_time,
    },
    end: {
      date: confirmedTime.end_date ?? '',
      day: confirmedTime.end_day ?? '',
      time: confirmedTime.end_time,
    },
    category,
  });
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
