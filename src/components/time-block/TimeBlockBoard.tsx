import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { EventValue } from '../../types/event.type';
import { Schedules, Time, TimeBlockPopUpData } from '../../types/schedule.type';
import TimeBlockPopUp from '../dialog/TimeBlockPopUp';
import TBDayLine from './TBDayLine';
import TBLeftLabelLine from './TBLeftLabelLine';
import { IconTriangleFilled } from '@tabler/icons-react';

interface TimeBlockBoardProps {
  event: EventValue;
  schedules: Schedules[];
  setSchedules?: React.Dispatch<React.SetStateAction<Schedules[]>>;
  editable?: boolean;
}

export default function TimeBlockBoard({
  event,
  schedules,
  setSchedules,
  editable,
}: TimeBlockBoardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<TimeBlockPopUpData>({
    timePoint: '',
    time: '',
    members: {
      possible: [],
      impossible: [],
    },
  });
  const [dayLineWidth, setDayLineWidth] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);

  const dayLineRef = useRef<HTMLDivElement>(null);
  const boardContentRef = useRef<HTMLDivElement>(null);

  const dayLineGap = 12;
  const timePointChunks = chunkRangeArray(event.ranges, 5);

  console.log(timePointChunks);

  function changeTimeBlockStatus(
    day: string,
    time: Schedules['schedules'][0]['times'][0],
    newStatus: boolean,
  ) {
    if (!editable || !setSchedules) return;
    setSchedules((prev) => [
      {
        name: prev[0].name,
        schedules: prev[0].schedules.map((schedule) => {
          if (schedule.time_point === day) {
            let newSchedule: Time = {
              ...schedule,
              times: schedule.times.filter((t) => t !== time),
            };
            if (newStatus) {
              newSchedule = {
                ...newSchedule,
                times: [...newSchedule.times, time],
              };
            }
            return newSchedule;
          } else {
            return schedule;
          }
        }),
      },
    ]);
  }

  function handleDialogOpen({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) {
    if (schedules.length === 0) return;

    let members: TimeBlockPopUpData['members'] = {
      possible: [],
      impossible: [],
    };

    schedules.forEach((schedule) => {
      if (
        schedule.schedules
          .find((s) => s.time_point === timePoint)
          ?.times.includes(time)
      ) {
        members.possible.push(schedule.name);
      } else {
        members.impossible.push(schedule.name);
      }
    });

    members = {
      possible: members.possible.sort(),
      impossible: members.impossible.sort(),
    };

    setDialogData({
      timePoint,
      time,
      members,
    });
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  function handleLeftScroll() {
    if (!boardContentRef.current) return;
    if (chunkIndex - 1 > 0) {
      boardContentRef.current.scrollBy({
        left: -boardContentRef.current.clientWidth - dayLineGap,
        behavior: 'smooth',
      });
    } else {
      boardContentRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
    setChunkIndex((prev) => {
      if (prev - 1 < 0) return prev;
      return prev - 1;
    });
  }

  function handleRightScroll() {
    if (!boardContentRef.current) return;
    if (chunkIndex + 1 < timePointChunks.length - 1) {
      boardContentRef.current.scrollBy({
        left: boardContentRef.current.clientWidth + dayLineGap,
        behavior: 'smooth',
      });
    } else {
      boardContentRef.current.scrollTo({
        left: boardContentRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
    setChunkIndex((prev) => {
      if (prev + 1 >= timePointChunks.length) return prev;
      return prev + 1;
    });
  }

  function chunkRangeArray(array: string[], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      result.push(chunk);
    }
    return result;
  }

  useEffect(() => {
    function handleResize() {
      setDayLineWidth(dayLineRef.current?.clientWidth || 0);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dayLineRef]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="title-sm-300 text-gray-90">가능한 스케줄</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLeftScroll}
            className="flex w-6 -rotate-90 items-center justify-center text-gray-90 disabled:text-gray-15"
            disabled={chunkIndex === 0}
          >
            <IconTriangleFilled size={12} />
          </button>
          <button
            onClick={handleRightScroll}
            className="flex w-6 rotate-90 items-center justify-center disabled:text-gray-15"
            disabled={chunkIndex === timePointChunks.length - 1}
          >
            <IconTriangleFilled size={12} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex gap-3 overflow-hidden">
        <TBLeftLabelLine
          startTime={event.start_time}
          endTime={event.end_time}
          category={event.category}
        />
        <div
          ref={boardContentRef}
          className="flex flex-1 overflow-hidden"
          style={{ gap: dayLineGap }}
        >
          {timePointChunks.map((timePoints, index) => (
            <div
              className={clsx('flex', {
                'min-w-full':
                  index !== timePointChunks.length - 1 ||
                  timePointChunks.length === 1,
              })}
              style={{ gap: dayLineGap }}
            >
              {timePoints.map((timePoint) => {
                return (
                  <TBDayLine
                    ref={
                      index !== timePointChunks.length - 1
                        ? dayLineRef
                        : undefined
                    }
                    key={timePoint}
                    timePoint={timePoint}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    category={event.category}
                    schedules={schedules}
                    changeTimeBlockStatus={changeTimeBlockStatus}
                    handleDialogOpen={handleDialogOpen}
                    editable={editable}
                    minWidth={
                      index === timePointChunks.length - 1
                        ? dayLineWidth
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {isDialogOpen && (
        <TimeBlockPopUp
          onClose={handleDialogClose}
          timePoint={dialogData.timePoint}
          time={dialogData.time}
          members={dialogData.members}
          category={event.category}
        />
      )}
    </>
  );
}
