import { useEffect, useRef, useState } from 'react';

import { EventType } from '../../types/event.type';
import { Schedule, Time, TimeBlockPopUpData } from '../../types/schedule.type';
import { getBlockTimeList } from '../../utils/time-block';
import TBBoardActionButton from '../button/TBBoardActionButton';
import TimeBlockPopUp from '../pop-up/TimeBlockPopUp';
import PossibleTimeToggle from './PossibleTimeToggle';
import TBDayLine from './TBDayLine';
import TBLeftLabelLine from './TBLeftLabelLine';
import { IconTriangleFilled } from '@tabler/icons-react';

interface TimeBlockBoardProps {
  event: EventType;
  schedules: Schedule[];
  setSchedules?: React.Dispatch<React.SetStateAction<Schedule[]>>;
  editable?: boolean;
  backgroundColor?: 'white' | 'gray';
  topAction?: boolean;
  topActionOnClick?: {
    share: () => void;
    delete: () => void;
  };
  isCreator?: boolean;
  isPossibleTime?: boolean;
  setIsPossibleTime?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimeBlockBoard({
  event,
  schedules,
  setSchedules,
  editable,
  backgroundColor = 'gray',
  topAction = false,
  topActionOnClick,
  isCreator,
  isPossibleTime = true,
  setIsPossibleTime,
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
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const dayLineRef = useRef<HTMLDivElement>(null);
  const boardContentRef = useRef<HTMLDivElement>(null);

  const dayLineGap = 12;
  const timePointChunks = chunkRangeArray(event.ranges, 5);
  const innerContentProportion = timePointChunks.length >= 2 ? 0.9 : 1;

  function changeTimeBlockStatus(
    day: string,
    time: Schedule['schedules'][0]['times'][0],
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
        left:
          (-boardContentRef.current.clientWidth - dayLineGap) *
          innerContentProportion,
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
        left:
          (boardContentRef.current.clientWidth + dayLineGap) *
          innerContentProportion,
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

  function handleAvailableToggle() {
    if (!editable || !setSchedules) return;

    let prevIsAvailable = isPossibleTime;

    if (setIsPossibleTime) {
      setIsPossibleTime((prev) => !prev);
    }

    if (prevIsAvailable && isEmpty) {
      setSchedules(
        schedules.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: getBlockTimeList(event.start_time, event.end_time),
          })),
        })),
      );
    }

    if (!prevIsAvailable && isFull) {
      setSchedules(
        schedules.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: [],
          })),
        })),
      );
    }
  }

  useEffect(() => {
    function handleResize() {
      setDayLineWidth(dayLineRef.current?.clientWidth || 0);
      console.log(dayLineRef.current?.clientWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dayLineRef]);

  useEffect(() => {
    if (!editable || schedules.length === 0) return;
    setIsEmpty(schedules[0].schedules.every((s) => s.times.length === 0));
    setIsFull(
      schedules[0].schedules.every(
        (s) =>
          getBlockTimeList(event.start_time, event.end_time).filter(
            (time) => !s.times.includes(time),
          ).length === 0,
      ),
    );
  }, [schedules]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        {editable ? (
          <PossibleTimeToggle
            isPossibleTime={isPossibleTime}
            onToggle={handleAvailableToggle}
          />
        ) : topAction ? (
          <div className="flex gap-2">
            <TBBoardActionButton
              mode="share"
              onClick={topActionOnClick?.share}
            />
            {isCreator && (
              <TBBoardActionButton
                mode="delete"
                onClick={topActionOnClick?.delete}
              />
            )}
          </div>
        ) : (
          <h2 className="text-gray-90 title-sm-300">가능한 스케줄</h2>
        )}
        {timePointChunks.length !== 1 && (
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
        )}
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
              key={index}
              className="flex"
              style={{
                gap: dayLineGap,
                minWidth:
                  index !== timePointChunks.length - 1 ||
                  timePointChunks.length === 1
                    ? `${innerContentProportion * 100}%`
                    : undefined,
              }}
            >
              {timePoints.map((timePoint) => {
                return (
                  <TBDayLine
                    key={timePoint}
                    ref={
                      index !== timePointChunks.length - 1
                        ? dayLineRef
                        : undefined
                    }
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
                    isPossibleTime={isPossibleTime}
                    backgroundColor={backgroundColor}
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
    </div>
  );
}
