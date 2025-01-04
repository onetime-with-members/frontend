import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';

import axios from '../api/axios';
import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { ScrollContext } from '../contexts/ScrollContext';
import { weekdaysShortLowerEn } from '../utils/weekday';
import EmptyUI from './EmptyUI';
import MyWeekdayScheduleList from './MyWeekdayScheduleList';
import { useQuery } from '@tanstack/react-query';

interface MyScheduleListProps {
  hasWeekdaySelcectUI?: boolean;
  className?: string;
}

export default function MyScheduleList({
  hasWeekdaySelcectUI = true,
  className,
}: MyScheduleListProps) {
  const [activeWeekday, setActiveWeekday] =
    useState<(typeof weekdaysShortLowerEn)[number]>('sun');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { selectedTimeBlockId } = useContext(MyScheduleContext);
  const { scrollContainerRef } = useContext(ScrollContext);

  const weekdayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mobileScrollOffset = 300;
  const desktopScrollOffset = 200;
  const weekdayUIHeight = 56;
  const responsiveBreakpoint = 768;

  const { data: mySchedules, isLoading: isMySchedulesLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload;
    },
  });

  function handleWeekdayButtonClick(
    weekday: (typeof weekdaysShortLowerEn)[number],
  ) {
    const weekdayRef =
      weekdayRefs.current[weekdaysShortLowerEn.indexOf(weekday)];

    if (weekdayRef) {
      if (screenWidth >= responsiveBreakpoint) {
        if (scrollContainerRef && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const element = weekdayRef;

          container.scrollTo({
            top: element.offsetTop - container.offsetTop - weekdayUIHeight,
            behavior: 'smooth',
          });
        }
      } else {
        weekdayRef.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  useEffect(() => {
    if (mySchedules.length === 0) return;

    const handleScroll = () => {
      let currentWeekday = '';

      if (screenWidth < responsiveBreakpoint) {
        weekdayRefs.current.forEach((weekDayRef) => {
          if (weekDayRef) {
            const sectionTop = weekDayRef.offsetTop;

            if (scrollY > sectionTop - mobileScrollOffset) {
              currentWeekday = weekDayRef.getAttribute('id') || '';
            }
          }
        });
      }

      setActiveWeekday(currentWeekday);
    };

    document.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, [screenWidth]);

  useEffect(() => {
    function handleResize() {
      let currentWeekday = '';

      if (screenWidth >= responsiveBreakpoint) {
        weekdayRefs.current.forEach((weekDayRef) => {
          if (weekDayRef && scrollContainerRef && scrollContainerRef.current) {
            const sectionTop =
              weekDayRef.offsetTop - scrollContainerRef.current.offsetTop;
            const scrollTop = scrollContainerRef.current.scrollTop;

            if (
              scrollTop >=
              sectionTop - weekdayUIHeight - desktopScrollOffset
            ) {
              currentWeekday = weekDayRef.getAttribute('id') || '';
            }
          }
        });
      }

      setActiveWeekday(currentWeekday);
    }

    scrollContainerRef?.current?.addEventListener('scroll', handleResize);

    return () =>
      scrollContainerRef?.current?.removeEventListener('scroll', handleResize);
  }, [screenWidth]);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMySchedulesLoading || mySchedules === undefined) {
    return <></>;
  }

  return (
    <div className={clsx('flex flex-col gap-2 bg-gray-00', className)}>
      {hasWeekdaySelcectUI && (
        <div className="h-[56px] w-full">
          <div
            className={clsx(
              'fixed left-0 flex w-full justify-center bg-gray-00 px-4 py-2 md:absolute md:z-30 md:w-full md:px-0',
              {
                'z-[101]': selectedTimeBlockId,
              },
            )}
          >
            {selectedTimeBlockId && (
              <div className="absolute left-0 top-0 h-full w-full bg-gray-90 bg-opacity-30" />
            )}
            <div className="flex w-full max-w-screen-sm items-center justify-between">
              {weekdaysShortLowerEn.map((weekday) => (
                <button
                  onClick={() => handleWeekdayButtonClick(weekday)}
                  key={weekday}
                  className={clsx(
                    'flex h-10 w-10 items-center justify-center',
                    {
                      'rounded-full bg-primary-00 text-primary-60 text-md-300':
                        activeWeekday === weekday,
                      'text-gray-40 text-md-200': activeWeekday !== weekday,
                    },
                  )}
                >
                  {dayjs.weekdaysShort()[weekdaysShortLowerEn.indexOf(weekday)]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedTimeBlockId && (
        <div className="fixed left-0 top-0 h-screen w-screen bg-gray-90 bg-opacity-30" />
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
                className="scroll-mt-[120px]"
              />
            ))}
          </div>
          <div className="h-[calc(30vh-120px)]" />
        </>
      )}
    </div>
  );
}
