import dayjs from 'dayjs';

export function getBlockCount(startTime: string, endTime: string) {
  const blockCount =
    dayjs(endTime, 'HH:mm').diff(dayjs(startTime, 'HH:mm'), 'minute') / 30;

  return blockCount;
}

function getTimeList(blockCount: number, startTime: string) {
  const timeList = Array.from({ length: blockCount }, (_, i) =>
    dayjs(startTime, 'HH:mm')
      .add(i * 30, 'minute')
      .format('HH:mm'),
  );

  return timeList;
}

export function getLabelTimeList(startTime: string, endTime: string) {
  const blockCount = getBlockCount(startTime, endTime) + 1;

  let timeList = getTimeList(blockCount, startTime);

  if (endTime === '24:00') timeList[timeList.length - 1] = '24:00';

  return timeList;
}

export function getBlockTimeList(startTime: string, endTime: string) {
  const blockCount = getBlockCount(startTime, endTime);

  const timeList = getTimeList(blockCount, startTime);

  return timeList;
}
