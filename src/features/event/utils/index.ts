import type { Locale } from 'next-intl';

import { exampleEventList } from '../mocks/example-events';
import { ConfirmedEventData, EventType, SelectedDateTime } from '../types';
import { weekdaysShortKo } from '@/constants';
import { MyEventType } from '@/features/user/types';
import dayjs from '@/lib/dayjs';
import { formatTimeAmPmCompact } from '@/utils';

export const foundExampleEvent = (eventId: string) =>
  exampleEventList.find(({ slug }) => slug.includes(eventId));

export const isExampleEventSlug = (eventId: string) =>
  !!foundExampleEvent(eventId);

export function parseDateTime(date: string, time?: string) {
  return time
    ? dayjs(`${date} ${time}`, 'YYYY.MM.DD HH:mm')
    : dayjs(date, 'YYYY.MM.DD');
}

export function parseDayTime(day: string, time?: string) {
  return dayjs(...(time ? [time, 'HH:mm'] : [])).day(
    weekdaysShortKo.findIndex((weekday) => weekday === day),
  );
}

function getEventTimeSummary({
  start,
  end,
  category,
  locale,
}: {
  start: { date: string; day: string; time: string };
  end: { date: string; day: string; time: string };
  category: 'DATE' | 'DAY';
  locale: 'ko' | 'en';
}) {
  if (category === 'DATE') {
    const startDate = parseDateTime(start.date);
    const endDate = parseDateTime(end.date);

    return start.date === end.date
      ? `${startDate.format('MM/DD (ddd)')} ${start.time} - ${end.time}`
      : `${startDate.format('MM/DD(ddd)')} ${start.time} - ${endDate.format('MM/DD(ddd)')} ${end.time}`;
  } else {
    const startDay = parseDayTime(start.day);
    const endDay = parseDayTime(end.day);

    const ddd = locale === 'ko' ? 'dddd' : 'ddd';

    return start.day === end.day
      ? `${startDay.format(ddd)} ${start.time} - ${end.time}`
      : `${startDay.format(ddd)} - ${endDay.format(ddd)} ${end.time}`;
  }
}

export function getRecommendedTimeText({
  recommendedTime,
  category,
  locale,
}: {
  recommendedTime: MyEventType['most_possible_times'][0];
  category: 'DATE' | 'DAY';
  locale: 'ko' | 'en';
}) {
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
    locale,
  });
}

export function getConfirmedTimeText({
  confirmedTime,
  category,
  locale,
}: {
  confirmedTime: ConfirmedEventData;
  category: 'DATE' | 'DAY';
  locale: 'ko' | 'en';
}) {
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
    locale,
  });
}

export function getConfirmedTimeMainLineText({
  confirmedTime,
  category,
  locale,
}: {
  confirmedTime: ConfirmedEventData;
  category: 'DATE' | 'DAY';
  locale: Locale;
}): string {
  const startTime = confirmedTime.start_time;
  if (!startTime) return '';

  const timeStr = formatTimeAmPmCompact(startTime, locale);

  if (category === 'DATE') {
    const startDate = confirmedTime.start_date;
    if (!startDate) return timeStr;

    const d = parseDateTime(startDate, startTime);

    if (locale === 'ko') {
      const dateStr = `${d.format('YYYY')}. ${d.format('M')}. ${d.format('D')}.`;
      const w = weekdaysShortKo[d.day()];
      return `${dateStr} ${w} ${timeStr}`;
    }

    const w = d.locale('en').format('ddd');
    const dateStr = d.locale('en').format('MMM D, YYYY');
    return `${w}, ${dateStr} ${timeStr}`;
  }

  const startDay = confirmedTime.start_day ?? '';
  if (locale === 'ko') {
    return startDay ? `${startDay} ${timeStr}` : timeStr;
  }

  const idx = weekdaysShortKo.findIndex((w) => w === startDay);
  if (idx >= 0) {
    const label = dayjs().day(idx).locale('en').format('dddd');
    return `${label} ${timeStr}`;
  }

  return startDay ? `${startDay} ${timeStr}` : timeStr;
}

export function getConfirmedTimeFromNow({
  confirmedTime: {
    start_date: startDate,
    end_date: endDate,
    start_day: startDay,
    end_day: endDay,
    start_time: startTime,
    end_time: endTime,
  },
  category,
  ongoingText = 'Ongoing',
}: {
  confirmedTime: ConfirmedEventData;
  category: 'DATE' | 'DAY';
  ongoingText?: string;
}) {
  if (category === 'DATE') {
    const startDateTime = parseDateTime(startDate ?? '', startTime);
    const endDateTime = parseDateTime(endDate ?? '', endTime);

    return dayjs().isBefore(startDateTime)
      ? startDateTime.fromNow()
      : dayjs().isAfter(endDateTime)
        ? endDateTime.fromNow()
        : ongoingText;
  } else {
    const startDayTime = parseDayTime(startDay ?? '', startTime);
    const endDayTime = parseDayTime(endDay ?? '', endTime);

    return dayjs().isBefore(startDayTime)
      ? startDayTime.fromNow()
      : dayjs().isAfter(endDayTime)
        ? startDayTime.add(1, 'week').fromNow()
        : ongoingText;
  }
}

export function eventToDateTime(event: EventType): SelectedDateTime {
  const confirmedTime = event.confirmation;

  return {
    start: {
      date:
        event.category === 'DATE'
          ? (confirmedTime?.start_date ?? '')
          : (confirmedTime?.start_day ?? ''),
      time: confirmedTime?.start_time ?? '',
    },
    end: {
      date:
        event.category === 'DATE'
          ? (confirmedTime?.end_date ?? '')
          : (confirmedTime?.end_day ?? ''),
      time: confirmedTime?.end_time ?? '',
    },
  };
}

export function getDefaultConfirmTimeFromNow(): string {
  const now = dayjs();
  const totalMinutes = now.hour() * 60 + now.minute();
  const ceiledMinutes = Math.ceil(totalMinutes / 30) * 30;

  if (ceiledMinutes >= 24 * 60) {
    return '24:00';
  }

  const h = Math.floor(ceiledMinutes / 60);
  const m = ceiledMinutes % 60;

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
