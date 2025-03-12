import TimeBlockLine, {
  TimeBlockLineProps,
} from './TimeBlockLine/TimeBlockLine';
import useDragScroll from '@/hooks/useDragScroll';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import CircleArrowButton from '@/pages/EventDetailPage/MainContent/BannerList/CircleArrowButton/CircleArrowButton';
import { EventType } from '@/types/event.type';
import { TimeType } from '@/types/schedule.type';

interface BoardContentProps {
  boardContentRef: React.RefObject<HTMLDivElement>;
  event: EventType;
  schedules: TimeBlockLineProps['schedules'];
  changeTimeBlockStatus: (
    day: TimeType['time_point'],
    time: TimeType['times'][0],
    newStatus: boolean,
  ) => void;
  handleDialogOpen: TimeBlockLineProps['onDialogOpen'];
  editable: boolean | undefined;
  isPossibleTime: TimeBlockLineProps['isPossibleTime'];
  backgroundColor: TimeBlockLineProps['backgroundColor'];
}

export default function BoardContent({
  boardContentRef,
  event,
  schedules,
  changeTimeBlockStatus,
  handleDialogOpen,
  editable,
  isPossibleTime,
  backgroundColor,
}: BoardContentProps) {
  const {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  } = useDragScroll({ ref: boardContentRef });
  const { clickedTimeBlock, handleTimeBlockClick } = useTimeBlockFill({
    isFilled,
    fillTimeBlocks: ({ timePoint, times, isFilling }) =>
      times.forEach((time) =>
        changeTimeBlockStatus(timePoint, time, isFilling),
      ),
  });
  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({ ref: boardContentRef });

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
      className="scrollbar-hidden relative flex flex-1 gap-2 overflow-x-scroll"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragLeave}
    >
      {arrowButtonVisible.left && (
        <CircleArrowButton
          direction="left"
          className="absolute left-10 top-1/2 -translate-y-1/2"
          onClick={handleScrollLeft}
        />
      )}
      {event.ranges.map((timePoint) => (
        <TimeBlockLine
          key={timePoint}
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
          isPossibleTime={isPossibleTime}
          backgroundColor={backgroundColor}
          isBoardContentDragging={isDragEvent}
        />
      ))}
      {arrowButtonVisible.right && (
        <CircleArrowButton
          direction="right"
          className="absolute right-10 top-1/2 -translate-y-1/2"
          onClick={handleScrollRight}
        />
      )}
    </div>
  );
}
