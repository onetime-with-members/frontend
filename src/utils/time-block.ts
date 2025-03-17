import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
