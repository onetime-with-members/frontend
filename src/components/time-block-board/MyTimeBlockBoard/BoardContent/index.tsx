import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { MyNewSchedule, MySchedule } from '@/types/schedule.type';
import cn from '@/utils/cn';
import { getBlockTimeList } from '@/utils/time-block';

interface TimeBlockContentProps {
  mode: 'view' | 'create' | 'edit';
  mySchedules: MySchedule[];
  setMyNewSchedule?: (newSchedule: MyNewSchedule['schedules']) => void;
  editedScheduleId?: number;
  backgroundColor?: 'gray' | 'white';
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoardContent({
  mode,
  mySchedules,
  setMyNewSchedule,
  editedScheduleId = -1,
  backgroundColor = 'gray',
  setIsEdited,
}: TimeBlockContentProps) {
  const [timeBlockData, setTimeBlockData] = useState(
    mySchedules.flatMap((schedule) =>
      schedule.schedules.map((s) => ({
        id: schedule.id,
        time_point: s.time_point,
        times: s.times,
      })),
    ),
  );

  const {
    selectedTimeBlockId,
    setSelectedTimeBlockId,
    isSelectTimeBlockDisabled,
  } = useContext(MyScheduleContext);

  const { clickedTimeBlock, handleTimeBlockClick: handleTimeBlockFill } =
    useTimeBlockFill({
      isFilledFor: ({ time, timePoint }) => isFilledFor(timePoint, time),
      fillTimeBlocks: ({ timePoint, times, isFilling }) => {
        changeTimeBlock(timePoint, times, isFilling);
        setIsEdited && setIsEdited(true);
      },
    });

  const timeBlockList = getBlockTimeList('00:00', '24:00', '30m');
  const editedId = mode === 'edit' ? editedScheduleId : -2;

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

  function isFilledFor(timePoint: string, time: string) {
    return timeBlockData.some(
      (r) => r.time_point === timePoint && r.times.includes(time),
    );
  }

  function isClickedFirstFor(weekday: string, time: string) {
    return (
      clickedTimeBlock.timePoint === weekday &&
      clickedTimeBlock.startTime === time
    );
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

    return cn(
      'h-[3rem] last:border-b-0',
      {
        'border-b border-gray-10 odd:border-dashed even:border-solid':
          !isTimeBlockExist(weekday, time),
      },
      {
        'bg-gray-05': backgroundColor === 'gray',
        'bg-gray-00': backgroundColor === 'white',
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
            'relative border-l-2 border-r-2 border-gray-00 bg-primary-40':
              isTimeBlockSelected(weekday, time),
            'border-t-2': isTimeBlockChunkEdge(weekday, time, 'start'),
            'border-b-2': isTimeBlockChunkEdge(weekday, time, 'end'),
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
      {
        'bg-primary-10 border border-dashed border-primary-50 odd:border-dashed even:border-dashed':
          isClickedFirstFor(weekday, time),
      },
    );
  }

  function handleTimeBlockClick(weekday: string, time: string) {
    if (mode === 'view') {
      handleTimeBlockSelect();
    } else {
      handleTimeBlockFill({ timePoint: weekday, time });
    }

    function handleTimeBlockSelect() {
      if (!setSelectedTimeBlockId) return;
      setSelectedTimeBlockId(
        timeBlockData.find(
          (tb) => tb.time_point === weekday && tb.times.includes(time),
        )?.id || null,
      );
    }
  }

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
    <div className="grid flex-1 grid-cols-7 gap-2">
      {dayjs.weekdaysMin().map((weekday) => (
        <div key={weekday} className="overflow-hidden rounded-lg">
          {timeBlockList.map((time, index) => (
            <div
              key={index}
              onClick={() => handleTimeBlockClick(weekday, time)}
              className={timeBlockStyle(weekday, time)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
