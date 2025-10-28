import { SleepTimeType } from '../types';
import { timeBlockList } from '@/features/schedule/utils';

export function getTimesGroupForSplitted(
  type: 'timeBlock' | 'timeLabel',
  sleepTime: SleepTimeType,
  sleepTimesList: string[],
) {
  return sleepTime.sleep_start_time >= sleepTime.sleep_end_time
    ? [
        timeBlockList('00:00', '24:00', type === 'timeBlock' ? '30m' : '1h')
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(
            type === 'timeLabel'
              ? [
                  sleepTime.sleep_start_time === sleepTime.sleep_end_time
                    ? '24:00'
                    : sleepTime.sleep_start_time,
                ]
              : [],
          ),
      ]
    : [
        timeBlockList(
          '00:00',
          sleepTime.sleep_start_time,
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? [sleepTime.sleep_start_time] : []),
        timeBlockList(
          sleepTime.sleep_end_time,
          '24:00',
          type === 'timeBlock' ? '30m' : '1h',
        )
          .filter((timeLabel) => !sleepTimesList.includes(timeLabel))
          .concat(type === 'timeLabel' ? ['24:00'] : []),
      ];
}
