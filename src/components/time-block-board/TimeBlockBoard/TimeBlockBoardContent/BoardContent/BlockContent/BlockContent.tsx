import { useContext } from 'react';

import TimeBlockLine from './TimeBlockLine';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import useDragScroll from '@/features/schedule/hooks/useDragScroll';
import useTimeBlockFill from '@/features/schedule/hooks/useTimeBlockFill';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';

export default function BlockContent({
  changeTimeBlockStatus,
}: {
  changeTimeBlockStatus: (
    day: string,
    time: string,
    newStatus: boolean,
  ) => void;
}) {
  const { event, boardContentRef, topLabelRef } = useContext(
    TimeBlockBoardContext,
  );

  const {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  } = useDragScroll({ ref: boardContentRef, scrollSyncRef: topLabelRef });
  const { clickedTimeBlock, handleTimeBlockClick } = useTimeBlockFill({
    fillTimeBlocks: ({ timePoint, times, isFilling }) =>
      times.forEach((time) =>
        changeTimeBlockStatus(timePoint, time, isFilling),
      ),
  });

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
          clickedTimeBlock={clickedTimeBlock}
          onTimeBlockClick={handleTimeBlockClick}
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
