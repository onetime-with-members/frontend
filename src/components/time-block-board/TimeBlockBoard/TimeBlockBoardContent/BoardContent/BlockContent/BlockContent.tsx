import { useContext } from 'react';

import TimeBlockLine from './TimeBlockLine';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import useDragScroll from '@/features/schedule/hooks/useDragScroll';
import useTimeBlockFill from '@/features/schedule/hooks/useTimeBlockFill';
import { TimeType } from '@/features/schedule/types';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function BlockContent({
  changeTimeBlockStatus,
  onPopUpOpen,
}: {
  changeTimeBlockStatus: (
    day: string,
    time: string,
    newStatus: boolean,
  ) => void;
  onPopUpOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
}) {
  const {
    isPossibleTime,
    editable,
    event,
    schedules,
    boardContentRef,
    topLabelRef,
    backgroundColor,
  } = useContext(TimeBlockBoardContext);

  const {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  } = useDragScroll({ ref: boardContentRef, scrollSyncRef: topLabelRef });
  const { clickedTimeBlock, handleTimeBlockClick } = useTimeBlockFill({
    isFilled,
    fillTimeBlocks: ({ timePoint, times, isFilling }) =>
      times.forEach((time) =>
        changeTimeBlockStatus(timePoint, time, isFilling),
      ),
  });

  function timesAllMember(timePoint: string) {
    let result: string[] = [];
    schedules.forEach((schedule) => {
      schedule.schedules.forEach((daySchedule) => {
        if (daySchedule.time_point === timePoint) {
          result = [...result, ...daySchedule.times];
        }
      });
    });
    return result;
  }

  function isFilled(timePoint: string, time: TimeType['times'][0]) {
    return timesAllMember(timePoint).includes(time);
  }

  function isClickedFirstFor(timePoint: string, time: TimeType['times'][0]) {
    return (
      clickedTimeBlock.startTime === time &&
      clickedTimeBlock.timePoint === timePoint
    );
  }

  return (
    <div
      ref={boardContentRef}
      className="scrollbar-hidden flex flex-1 gap-2 overflow-x-hidden"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragLeave}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {event.ranges.map((timePoint, index) => (
        <TimeBlockLine
          key={timePoint}
          timePoint={timePoint}
          startTime={event.start_time}
          endTime={event.end_time}
          schedules={schedules}
          onTimeBlockClick={handleTimeBlockClick}
          onPopUpOpen={onPopUpOpen}
          isFilled={isFilled}
          isClickedFirstFor={isClickedFirstFor}
          timesAllMember={timesAllMember}
          editable={editable}
          isPossibleTime={isPossibleTime}
          backgroundColor={backgroundColor}
          isBoardContentDragging={isDragEvent}
          className={cn({
            'mr-2':
              event.category === 'DATE' &&
              !dayjs(event.ranges[index], 'YYYY.MM.DD')
                .add(1, 'day')
                .isSame(dayjs(event.ranges[index + 1], 'YYYY.MM.DD')),
          })}
        />
      ))}
    </div>
  );
}
