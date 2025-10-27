import { FieldErrors } from 'react-hook-form';

import dayjs from './dayjs';
import { SleepTime } from '@/features/my-schedule/models';
import { ScheduleType } from '@/features/schedule/models';

export function eventTarget(event: React.UIEvent): HTMLElement | null {
  if (event.type.includes('mouse') || event.type.includes('click')) {
    return event.target as HTMLElement;
  }
  if (event.type.includes('touch')) {
    const touch = (event as React.TouchEvent).touches[0];
    if (!touch) return null;
    return document.elementFromPoint(
      touch.clientX,
      touch.clientY,
    ) as HTMLElement;
  }
  return null;
}

export function minOf(a: string, b: string) {
  return a < b ? a : b;
}

export function maxOf(a: string, b: string) {
  return a > b ? a : b;
}

type TimeBlockUnit = '30m' | '1h';

export function getBlockCount(
  startTime: string,
  endTime: string,
  unit: TimeBlockUnit,
) {
  const blockCount =
    dayjs(endTime, 'HH:mm').diff(dayjs(startTime, 'HH:mm'), 'minute') /
    (unit === '30m' ? 30 : 60);

  return blockCount;
}

function getTimeList(
  blockCount: number,
  startTime: string,
  unit: TimeBlockUnit,
) {
  const timeList = Array.from({ length: blockCount }, (_, i) =>
    dayjs(startTime, 'HH:mm')
      .add(i * (unit === '30m' ? 30 : 60), 'minute')
      .format('HH:mm'),
  );

  return timeList;
}

export function timeLabelList(
  startTime: string,
  endTime: string,
  unit: TimeBlockUnit = '30m',
) {
  const blockCount = getBlockCount(startTime, endTime, unit) + 1;

  const timeList = getTimeList(blockCount, startTime, unit);

  if (endTime === '24:00') timeList[timeList.length - 1] = '24:00';

  return timeList;
}

export function timeBlockList(
  startTime: string,
  endTime: string,
  unit: TimeBlockUnit = '30m',
) {
  const blockCount = getBlockCount(startTime, endTime, unit);

  const timeList = getTimeList(blockCount, startTime, unit);

  return timeList;
}

export function leftTimeLabelFormat(time: string) {
  return time.split(':')[0] === '24' ? '24' : dayjs(time, 'HH:mm').format('H');
}

export function isNumber(value: string): boolean {
  const regex = /^[0-9]*$/;
  return regex.test(value);
}

export function policyPageTitle(name: string, locale: string) {
  return name === 'privacy'
    ? locale === 'ko'
      ? '개인정보 수집 및 이용 동의'
      : 'Privacy Policy'
    : locale === 'ko'
      ? '서비스 이용약관'
      : 'Terms of Service';
}

export function getTimesGroupForSplitted(
  type: 'timeBlock' | 'timeLabel',
  sleepTime: SleepTime,
  sleepTimesList: string[],
) {
  return sleepTime.startTime >= sleepTime.endTime
    ? [
        timeBlockList('00:00', '24:00', type === 'timeBlock' ? '30m' : '1h')
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(
            type === 'timeLabel'
              ? [
                  sleepTime.startTime === sleepTime.endTime
                    ? '24:00'
                    : sleepTime.startTime,
                ]
              : [],
          ),
      ]
    : [
        timeBlockList(
          '00:00',
          sleepTime.startTime,
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? [sleepTime.startTime] : []),
        timeBlockList(
          sleepTime.endTime,
          '24:00',
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? ['24:00'] : []),
      ];
}

export function getParticipants(schedules: ScheduleType[]) {
  return schedules.map((schedule) => schedule.name).sort();
}

export function errorCodes(errors: FieldErrors, key: keyof typeof errors) {
  return Object.values(errors[key]?.types || errors[key]?.type || {});
}
