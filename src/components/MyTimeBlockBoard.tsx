import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { MyNewSchedule, MySchedule } from '../types/schedule.type';
import { getBlockTimeList, getLabelTimeList } from '../utils/time-block';

interface MyTimeBlockBoard {
  mode: 'view' | 'create' | 'edit';
  mySchedules: MySchedule[];
  setMyNewSchedule?: (newSchedule: MyNewSchedule['schedules']) => void;
  handleDeleteButtonClick?: () => void;
  handleEditButtonClick?: () => void;
  editedScheduleId?: number;
  className?: string;
  backgroundColor?: 'gray' | 'white';
}

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
  setMyNewSchedule,
  editedScheduleId = -1,
  className,
  backgroundColor = 'gray',
}: MyTimeBlockBoard) {
  const [timeBlockData, setTimeBlockData] = useState(
    mySchedules.flatMap((schedule) =>
      schedule.schedules.map((s) => ({
        id: schedule.id,
        time_point: s.time_point,
        times: s.times,
      })),
    ),
  );
  const [drageStatus, setDragStatus] = useState<{
    isDragging: boolean;
    isFilling: boolean;
    weekday: string;
    times: string[];
  }>({
    isDragging: false,
    isFilling: false,
    weekday: '',
    times: [],
  });

  const timeBlockRefList = useRef<
    {
      weekday: string;
      time: string;
      ref: HTMLDivElement;
    }[]
  >([]);

  const {
    selectedTimeBlockId,
    setSelectedTimeBlockId,
    isSelectTimeBlockDisabled,
  } = useContext(MyScheduleContext);

  const timeBlockList = getBlockTimeList('00:00', '24:00', '30m');
  const labelTimeList = getLabelTimeList('00:00', '24:00', '1h');

  const editedId = mode === 'edit' ? editedScheduleId : -1;

  function changeTimeBlock(
    weekday: string,
    times: string[],
    isFilling: boolean,
  ) {
    if (mode === 'view') return;

    if (weekday === '' || times.length === 0) return;

    const newTimeBlockData = [...timeBlockData];

    const searchedIndex = newTimeBlockData.findIndex(
      (data) => data.id === editedId && data.time_point === weekday,
    );

    if (searchedIndex === -1) {
      newTimeBlockData.push({
        id: editedId,
        time_point: weekday,
        times: times,
      });
      setTimeBlockData([...newTimeBlockData]);
    } else {
      if (isFilling) {
        newTimeBlockData[searchedIndex].times = [
          ...new Set([...newTimeBlockData[searchedIndex].times, ...times]),
        ].sort();
      } else {
        newTimeBlockData[searchedIndex].times = newTimeBlockData[
          searchedIndex
        ].times
          .filter((time) => !times.includes(time))
          .sort();
      }
      setTimeBlockData([...newTimeBlockData]);
    }

    if (setMyNewSchedule) {
      setMyNewSchedule(getMyNewSchedule(newTimeBlockData));
    }
  }

  function getMyNewSchedule(newTimeBlockData: typeof timeBlockData) {
    return newTimeBlockData
      .filter((data) => {
        return data.id === editedId && data.times.length > 0;
      })
      .map((data) => ({
        time_point: data.time_point,
        times: data.times,
      }));
  }

  function isTimeBlockExist(weekday: string, time: string) {
    return timeBlockData.some(
      (r) => r.time_point === weekday && r.times.includes(time),
    );
  }

  function isTimeBlockInOtherSchedule(weekday: string, time: string) {
    return timeBlockData.some(
      (r) =>
        r.time_point === weekday && r.times.includes(time) && r.id !== editedId,
    );
  }

  function isTimeBlockSelected(weekday: string, time: string) {
    return (
      selectedTimeBlockId ===
      timeBlockData.find(
        (tb) => tb.time_point === weekday && tb.times.includes(time),
      )?.id
    );
  }

  function isTimeBlockChunkEdge(
    weekday: string,
    time: string,
    status: 'start' | 'end',
  ) {
    const schedule = timeBlockData.find(
      (r) => r.time_point === weekday && r.times.includes(time),
    );
    if (schedule) {
      const foundedIndex = schedule.times.findIndex((t) => t === time);
      if (foundedIndex !== -1) {
        if (status === 'start') {
          return (
            schedule.times[foundedIndex - 1] !==
            dayjs(time, 'HH:mm').subtract(30, 'minute').format('HH:mm')
          );
        } else if (status === 'end') {
          return (
            schedule.times[foundedIndex + 1] !==
            dayjs(time, 'HH:mm').add(30, 'minute').format('HH:mm')
          );
        }
      }
    }
    return false;
  }

  function timeBlockStyle(weekday: string, time: string) {
    const cursorStatus = isSelectTimeBlockDisabled
      ? 'cursor-default'
      : 'cursor-pointer';

    return clsx(
      'h-[3rem] last:border-b-0',
      {
        'border-b border-gray-10 odd:border-dashed even:border-solid':
          !isTimeBlockExist(weekday, time),
      },
      {
        'bg-gray-05':
          !isTimeBlockExist(weekday, time) && backgroundColor === 'gray',
        'bg-gray-00':
          !isTimeBlockExist(weekday, time) && backgroundColor === 'white',
      },
      {
        'rounded-t-lg border-t border-gray-00': isTimeBlockChunkEdge(
          weekday,
          time,
          'start',
        ),
        'rounded-b-lg border-b border-gray-00': isTimeBlockChunkEdge(
          weekday,
          time,
          'end',
        ),
      },
      mode === 'view'
        ? {
            [`bg-primary-40 ${cursorStatus}`]: isTimeBlockExist(weekday, time),
            'relative z-[100] border-l-2 border-r-2 border-gray-00 bg-primary-40':
              isTimeBlockSelected(weekday, time),
            'border-t-2':
              isTimeBlockChunkEdge(weekday, time, 'start') &&
              isTimeBlockSelected(weekday, time),
            'border-b-2':
              isTimeBlockChunkEdge(weekday, time, 'end') &&
              isTimeBlockSelected(weekday, time),
          }
        : {
            [cursorStatus]: !isTimeBlockExist(weekday, time),
            [`${cursorStatus} bg-primary-40 border-gray-00`]:
              isTimeBlockExist(weekday, time) &&
              !isTimeBlockInOtherSchedule(weekday, time),
            'bg-primary-20':
              isTimeBlockExist(weekday, time) &&
              isTimeBlockInOtherSchedule(weekday, time),
          },
    );
  }

  function addTimeBlockRefInList(
    weekday: string,
    time: string,
    element: HTMLDivElement | null,
  ) {
    if (element) {
      timeBlockRefList.current.push({
        weekday: weekday,
        time: time,
        ref: element,
      });
    }
  }

  function handleTimeBlockDragStart(weekday: string, time: string) {
    if (mode === 'view') return;

    if (isTimeBlockInOtherSchedule(weekday, time)) {
      return;
    }

    setDragStatus({
      isDragging: true,
      isFilling: !isTimeBlockExist(weekday, time),
      weekday: weekday,
      times: [time],
    });
  }

  function handleTimeBlockDragMove(weekday: string, time: string) {
    if (mode === 'view') return;

    if (!drageStatus.isDragging) return;

    if (isTimeBlockInOtherSchedule(weekday, time)) {
      handleTimeBlockDragEnd();
      return;
    }

    setDragStatus({
      ...drageStatus,
      times: [...new Set([...drageStatus.times, time])].sort(),
    });
  }

  function handleTimeBlockDragEnd() {
    if (mode === 'view') return;

    if (!drageStatus.isDragging) return;

    setDragStatus({
      isDragging: false,
      isFilling: false,
      weekday: '',
      times: [],
    });
  }

  function handleTimeBlockTouchEnd(e: React.TouchEvent) {
    if (mode === 'view') return;

    e.preventDefault();

    handleTimeBlockDragEnd();
  }

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') {
      if (setSelectedTimeBlockId) {
        setSelectedTimeBlockId(
          timeBlockData.find(
            (tb) => tb.time_point === weekday && tb.times.includes(time),
          )?.id || null,
        );
      }
    }
  }

  useEffect(() => {
    changeTimeBlock(
      drageStatus.weekday,
      drageStatus.times,
      drageStatus.isFilling,
    );
  }, [drageStatus]);

  useEffect(() => {
    function handleTimeBlockTouchMove(e: TouchEvent) {
      if (mode === 'view') return;

      const touchedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY,
      );

      const isInsideBlock = timeBlockRefList.current.some(
        (block) => block.ref === touchedElement,
      );

      if (isInsideBlock) {
        e.preventDefault();
      }

      let weekday, time;

      timeBlockRefList.current.forEach((block) => {
        if (block.ref === touchedElement) {
          weekday = block.weekday;
          time = block.time;
        }
      });

      if (weekday && time) {
        handleTimeBlockDragMove(weekday, time);
      }
    }

    document.addEventListener('touchmove', handleTimeBlockTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', handleTimeBlockTouchMove);
    };
  }, [drageStatus]);

  useEffect(() => {
    setTimeBlockData(
      mySchedules.flatMap((schedule) =>
        schedule.schedules.map((s) => ({
          id: schedule.id,
          time_point: s.time_point,
          times: s.times,
        })),
      ),
    );
  }, [mySchedules]);

  return (
    <div className={className}>
      {mode === 'view' && selectedTimeBlockId !== null && (
        <div className="fixed left-0 top-0 h-screen w-screen bg-gray-90 bg-opacity-30"></div>
      )}
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
                  {time === '24:00'
                    ? '24시'
                    : dayjs(time, 'HH:mm').format('H시')}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-7 gap-2">
          {dayjs.weekdaysMin().map((weekday) => (
            <div key={weekday} className="flex flex-col gap-2">
              <div
                key={weekday}
                className="text-center text-gray-30 text-md-200"
              >
                {weekday}
              </div>
              <div
                className="overflow-hidden rounded-lg"
                onMouseLeave={() => handleTimeBlockDragEnd()}
              >
                {timeBlockList.map((time, index) => (
                  <div
                    key={index}
                    ref={(el) => addTimeBlockRefInList(weekday, time, el)}
                    onClick={() => handleTimeBlockClick(weekday, time)}
                    onMouseDown={() => handleTimeBlockDragStart(weekday, time)}
                    onMouseMove={() => handleTimeBlockDragMove(weekday, time)}
                    onMouseUp={handleTimeBlockDragEnd}
                    onTouchStart={() => handleTimeBlockDragStart(weekday, time)}
                    onTouchEnd={handleTimeBlockTouchEnd}
                    className={timeBlockStyle(weekday, time)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
