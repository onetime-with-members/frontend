import dayjs from 'dayjs';

import { TabActiveType } from './types';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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

export function mypageTabActive(pathname: string): TabActiveType {
  if (pathname.startsWith('/mypage/events')) {
    return 'events';
  }
  if (pathname.startsWith('/mypage/schedules')) {
    return 'schedules';
  }
  if (pathname.startsWith('/mypage/profile')) {
    return 'profile';
  }
  return null;
}
