import TimeBlockLine, {
  TimeBlockLineProps,
} from './TimeBlockLine/TimeBlockLine';
import useDragScroll from '@/hooks/useDragScroll';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import { EventType } from '@/types/event.type';
import { TimeType } from '@/types/schedule.type';

interface BoardContentProps {
  boardContentRef: React.RefObject<HTMLDivElement>;
  dayLineRef: React.RefObject<HTMLDivElement>;
  dayLineGap: number;
  dayLineWidth: number;
  timePointChunks: string[][];
  event: EventType;
  schedules: TimeBlockLineProps['schedules'];
  changeTimeBlockStatus: (
    day: TimeType['time_point'],
    time: TimeType['times'][0],
    newStatus: boolean,
  ) => void;
  handleDialogOpen: TimeBlockLineProps['onDialogOpen'];
  editable: boolean | undefined;
  innerContentProportion: number;
  isPossibleTime: TimeBlockLineProps['isPossibleTime'];
  backgroundColor: TimeBlockLineProps['backgroundColor'];
}

export default function BoardContent({
  boardContentRef,
  dayLineRef,
  dayLineGap,
  dayLineWidth,
  timePointChunks,
  event,
  schedules,
  changeTimeBlockStatus,
  handleDialogOpen,
  editable,
  innerContentProportion,
  isPossibleTime,
  backgroundColor,
}: BoardContentProps) {
  const {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  } = useDragScroll<HTMLDivElement>({ ref: boardContentRef });
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
      className="scrollbar-hidden flex flex-1 overflow-x-scroll"
      style={{ gap: dayLineGap }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragLeave}
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
          {timePoints.map((timePoint) => (
            <TimeBlockLine
              key={timePoint}
              ref={
                index !== timePointChunks.length - 1 ? dayLineRef : undefined
              }
              timePoint={timePoint}
              startTime={event.start_time}
              endTime={event.end_time}
              schedules={schedules}
              onTimeBlockClick={handleTimeBlockClick}
              onDialogOpen={handleDialogOpen}
              isFilled={isFilled}
              isClickedFirstFor={isClickedFirstFor}
              timesAllMember={timesAllMember}
              editable={editable}
              minWidth={
                index === timePointChunks.length - 1 ? dayLineWidth : undefined
              }
              isPossibleTime={isPossibleTime}
              backgroundColor={backgroundColor}
              isBoardContentDragging={isDragEvent}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
