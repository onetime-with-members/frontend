import clsx from 'clsx';
import dayjs from 'dayjs';
import { forwardRef, useContext } from 'react';

import axios from '../api/axios';
import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { MyWeekdaySchedule } from '../types/schedule.type';
import { weekdaysShortLowerEn } from '../utils/weekday';
import { IconChevronRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

interface MyWeekdayScheduleListProps {
  weekday: (typeof weekdaysShortLowerEn)[number];
  className?: string;
}

const MyWeekdayScheduleList = forwardRef<
  HTMLDivElement,
  MyWeekdayScheduleListProps
>(function MyWeekdayScheduleList({ weekday, className }, ref) {
  const {
    selectedTimeBlockId,
    setSelectedTimeBlockId,
    isSelectTimeBlockDisabled,
  } = useContext(MyScheduleContext);

  const { data, isLoading } = useQuery({
    queryKey: ['fixed-schedules', 'by-day', weekday],
    queryFn: async () => {
      const res = await axios.get(`/fixed-schedules/by-day/${weekday}`);
      return res.data;
    },
  });

  const mySchedules: MyWeekdaySchedule[] = data?.payload || [];

  function handleWeekdayListItemClick(myScheduleId: number) {
    setSelectedTimeBlockId(myScheduleId);
  }

  if (isLoading || data === undefined) {
    return null;
  }

  return (
    <section
      id={weekday}
      ref={ref}
      className={clsx('flex flex-col gap-3 py-2', className)}
    >
      <h2 className="text-gray-30 text-sm-200">
        {dayjs.weekdays()[weekdaysShortLowerEn.findIndex((w) => w === weekday)]}
      </h2>
      <ul className="flex flex-col gap-3">
        {mySchedules.map((mySchedule) => (
          <li
            key={mySchedule.id}
            onClick={() => handleWeekdayListItemClick(mySchedule.id)}
            className={clsx(
              'flex items-center justify-between rounded-xl bg-gray-05 p-4',
              {
                'relative z-[100]': mySchedule.id === selectedTimeBlockId,
              },
              {
                'cursor-default': isSelectTimeBlockDisabled,
                'cursor-pointer': !isSelectTimeBlockDisabled,
              },
            )}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-80 text-md-300">{mySchedule.title}</h3>
              <div>
                <span className="text-gray-40 text-sm-200">
                  {mySchedule.start_time} - {mySchedule.end_time}
                </span>
              </div>
            </div>
            <div>
              <span className="text-gray-30">
                <IconChevronRight size={16} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default MyWeekdayScheduleList;
