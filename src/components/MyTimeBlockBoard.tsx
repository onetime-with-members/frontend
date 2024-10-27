import clsx from 'clsx';
import dayjs from 'dayjs';

import { getBlockTimeList, getLabelTimeList } from '../utils/time-block';

export default function MyTimeBlockBoard() {
  const timeBlockList = getBlockTimeList('00:00', '24:00', '30m');
  const labelTimeList = getLabelTimeList('00:00', '24:00', '1h');

  const mySchedules = [
    {
      id: 1,
      start_time: '10:00',
      end_time: '11:00',
      schedules: [
        {
          time_point: '화',
          times: ['10:00', '10:30'],
        },
        {
          time_point: '월',
          times: ['10:00', '10:30'],
        },
        {
          time_point: '수',
          times: ['10:00', '10:30'],
        },
      ],
    },
    {
      id: 2,
      start_time: '11:00',
      end_time: '12:00',
      schedules: [
        {
          time_point: '화',
          times: ['11:00', '11:30'],
        },
        {
          time_point: '수',
          times: ['11:00', '11:30'],
        },
      ],
    },
    {
      id: 3,
      start_time: '12:00',
      end_time: '13:00',
      schedules: [
        {
          time_point: '수',
          times: ['12:00', '12:30'],
        },
        {
          time_point: '목',
          times: ['12:00', '12:30'],
        },
      ],
    },
  ];

  [
    {
      id: 1,
      time_point: '월',
      times: ['10:00', '10:30'],
    },
    {
      id: 1,
      time_point: '화',
      times: ['10:00', '10:30'],
    },
    {
      id: 1,
      time_point: '수',
      times: ['10:00', '10:30'],
    },
    {
      id: 2,
      time_point: '화',
      times: ['11:00', '11:30'],
    },
    {
      id: 2,
      time_point: '수',
      times: ['11:00', '11:30'],
    },
    {
      id: 3,
      time_point: '수',
      times: ['12:00', '12:30'],
    },
    {
      id: 3,
      time_point: '목',
      times: ['12:00', '12:30'],
    },
  ];

  let result = mySchedules.flatMap((schedule) =>
    schedule.schedules.map((s) => ({
      id: schedule.id,
      time_point: s.time_point,
      times: s.times,
    })),
  );

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <div className="h-[1.5rem]"></div>
        <div>
          {labelTimeList.map((time, index) => (
            <div
              key={time}
              className={clsx('h-[6rem] text-center', {
                'h-0': index === labelTimeList.length - 1,
              })}
            >
              <span
                className={clsx(
                  'block -translate-y-1/2 text-gray-30 text-sm-200',
                  {
                    'translate-y-0': index === 0,
                    '-translate-y-full': index === labelTimeList.length - 1,
                  },
                )}
              >
                {time === '24:00' ? '24시' : dayjs(time, 'HH:mm').format('H시')}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-2">
        {dayjs.weekdaysMin().map((weekday) => (
          <div key={weekday} className="flex flex-col gap-2">
            <div key={weekday} className="text-center text-gray-30 text-md-200">
              {weekday}
            </div>
            <div className="overflow-hidden rounded-lg">
              {timeBlockList.map((timeBlock, index) => (
                <div
                  key={index}
                  className={clsx(
                    'h-[3rem] border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
                    {
                      'bg-primary-40': result.some(
                        (r) =>
                          r.time_point === weekday &&
                          r.times.includes(timeBlock),
                      ),
                    },
                    {
                      'rounded-t-lg': result.some(
                        (r) =>
                          r.time_point === weekday &&
                          r.times.includes(timeBlock) &&
                          r.times[0] === timeBlock,
                      ),
                    },
                    {
                      'rounded-b-lg': result.some(
                        (r) =>
                          r.time_point === weekday &&
                          r.times.includes(timeBlock) &&
                          r.times[1] === timeBlock,
                      ),
                    },
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
