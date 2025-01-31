import { useContext, useEffect, useRef, useState } from 'react';

import MyWeekdayScheduleList from './MyWeekdayScheduleList';
import WeekdaySelect from './WeekdaySelect';
import EmptyUI from '@/components/EmptyUI';
import Overlay from '@/components/overlay/Overlay';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { weekdaysShortLowerEn } from '@/utils/weekday';
import { useQuery } from '@tanstack/react-query';

interface MyScheduleListProps {
  hasWeekdaySelcect?: boolean;
  className?: string;
}

export default function MyScheduleList({
  hasWeekdaySelcect = true,
  className,
}: MyScheduleListProps) {
  const [activeWeekday, setActiveWeekday] =
    useState<(typeof weekdaysShortLowerEn)[number]>('sun');

  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  const weekdayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: mySchedules, isLoading: isMySchedulesLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload;
    },
  });

  useEffect(() => {
    if (mySchedules.length === 0) return;

    const handleScroll = () => {
      let currentWeekday = '';

      const scrollOffset = 300;

      weekdayRefs.current.forEach((weekDayRef) => {
        if (weekDayRef) {
          const sectionTop = weekDayRef.offsetTop;

          if (scrollY > sectionTop - scrollOffset) {
            currentWeekday = weekDayRef.getAttribute('id') || '';
          }
        }
      });

      setActiveWeekday(currentWeekday);
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  if (isMySchedulesLoading || mySchedules === undefined) {
    return <></>;
  }

  return (
    <div className={cn('flex flex-col gap-2 bg-gray-00', className)}>
      {hasWeekdaySelcect && (
        <WeekdaySelect
          weekdayRefs={weekdayRefs}
          activeWeekday={activeWeekday}
        />
      )}
      {mySchedules.length === 0 ? (
        <EmptyUI>아직 추가된 고정 스케줄이 없어요.</EmptyUI>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {weekdaysShortLowerEn.map((weekday, index) => (
              <MyWeekdayScheduleList
                key={weekday}
                ref={(el) => (weekdayRefs.current[index] = el)}
                weekday={weekday}
                className="scroll-mt-[122px] md:scroll-mt-[178px]"
              />
            ))}
          </div>
          <div className="h-[calc(30vh-120px)]" />
        </>
      )}
      {selectedTimeBlockId && <Overlay />}
    </div>
  );
}
