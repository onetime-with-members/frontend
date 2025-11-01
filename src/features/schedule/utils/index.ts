import { ClickedTimeBlock, ScheduleType, TimeBlockUnit } from '../types';
import dayjs from '@/lib/dayjs';

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

export function timesAllMember({
  schedules,
  timePoint,
}: {
  schedules: ScheduleType[];
  timePoint: string;
}) {
  let result: string[] = [];
  schedules.forEach((schedule) => {
    schedule.schedules.forEach((daySchedule) => {
      if (daySchedule.time_point === timePoint) {
        result = [...result, ...daySchedule.times];
      }
    });
  });
  return result;
}

export function isFilled({
  schedules,
  timePoint,
  time,
}: {
  schedules: ScheduleType[];
  timePoint: string;
  time: string;
}) {
  return timesAllMember({ schedules, timePoint }).includes(time);
}

export function isClickedFirstFor({
  clickedTimeBlock,
  timePoint,
  time,
}: {
  clickedTimeBlock: ClickedTimeBlock;
  timePoint: string;
  time: string;
}) {
  return (
    clickedTimeBlock.startTime === time &&
    clickedTimeBlock.timePoint === timePoint
  );
}
