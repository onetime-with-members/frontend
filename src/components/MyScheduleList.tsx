import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContext, useEffect, useRef, useState } from 'react';

import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { weekdaysShortLowerEn } from '../utils/weekday';
import MyWeekdayScheduleList from './MyWeekdayScheduleList';

export default function MyScheduleList() {
  const [activeWeekday, setActiveWeekday] =
    useState<(typeof weekdaysShortLowerEn)[number]>('sun');

  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  const weekdayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollContentOffset = 300;

  function handleWeekdayButtonClick(
    weekday: (typeof weekdaysShortLowerEn)[number],
  ) {
    const weekdayRef =
      weekdayRefs.current[weekdaysShortLowerEn.indexOf(weekday)];

    if (weekdayRef) {
      weekdayRef.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      let currentWeekday = '';
      document.querySelectorAll('section[id]').forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (scrollY > sectionTop - scrollContentOffset) {
          currentWeekday = section.getAttribute('id') || '';
        }
      });
      setActiveWeekday(currentWeekday);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="h-[56px]">
          <div className="fixed left-0 z-[101] flex w-full justify-center bg-gray-00 py-2">
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
        {selectedTimeBlockId && (
          <div className="fixed left-0 top-0 h-screen w-screen bg-gray-90 bg-opacity-30" />
        )}
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
      </div>
    </>
  );
}
