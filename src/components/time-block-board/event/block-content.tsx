import useDragScroll from '@/hooks/useDragScroll';
import useTimeBlockFill from '@/hooks/useTimeBlockFill';
import cn from '@/lib/cn';
import { EventType, ScheduleType, TimeType } from '@/lib/types';
import { eventTarget, timeBlockList } from '@/lib/utils';

export default function BlockContent({
  boardContentRef,
  event,
  schedules,
  changeTimeBlockStatus,
  handleDialogOpen,
  editable,
  isPossibleTime,
  backgroundColor,
}: {
  boardContentRef: React.RefObject<HTMLDivElement | null>;
  event: EventType;
  schedules: ScheduleType[];
  changeTimeBlockStatus: (
    day: string,
    time: string,
    newStatus: boolean,
  ) => void;
  handleDialogOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  editable: boolean | undefined;
  isPossibleTime: boolean;
  backgroundColor: 'white' | 'gray';
}) {
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
      className="scrollbar-hidden flex flex-1 gap-2 overflow-x-scroll"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragLeave}
    >
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
    </div>
  );
}

export function TimeBlockLine({
  timePoint,
  startTime,
  endTime,
  schedules,
  onTimeBlockClick,
  onDialogOpen,
  isFilled,
  isClickedFirstFor,
  timesAllMember,
  editable,
  isPossibleTime = true,
  backgroundColor,
  isBoardContentDragging,
}: {
  timePoint: string;
  startTime: string;
  endTime: string;
  schedules: ScheduleType[];
  onTimeBlockClick: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  onDialogOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  isFilled: (timePoint: string, time: string) => boolean;
  isClickedFirstFor: (timePoint: string, time: string) => boolean;
  timesAllMember: (timePoint: string) => string[];
  editable?: boolean;
  isPossibleTime?: boolean;
  backgroundColor: 'white' | 'gray';
  isBoardContentDragging?: boolean;
}) {
  const timeList: string[] = timeBlockList(startTime, endTime);

  const memberCount = schedules.length || 0;

  function handleTimeBlockClick(event: React.MouseEvent | React.TouchEvent) {
    if (isBoardContentDragging) return;
    const target = eventTarget(event);
    if (!target) return;
    const timePoint = target.dataset.timepoint;
    const time = target.dataset.time;
    if (!timePoint || !time) return;
    if (editable) {
      onTimeBlockClick({ timePoint, time });
    } else {
      onDialogOpen({ timePoint, time });
    }
  }

  return (
    <div className="min-w-[52px] flex-1">
      <div className="flex flex-col overflow-hidden rounded-lg">
        {timeList.map((time, index) => (
          <TimeBlock
            key={index}
            className={cn({
              'cursor-pointer': schedules.length > 0,
            })}
            active={isFilled(timePoint, time)}
            data-time={time}
            data-timepoint={timePoint}
            clickedFirst={isClickedFirstFor(timePoint, time)}
            bgOpacity={
              timesAllMember(timePoint).filter((t) => t === time).length /
              memberCount
            }
            editable={editable}
            isPossibleTime={isPossibleTime}
            isAllMembersAvailable={
              timesAllMember(timePoint).filter((t) => t === time).length ===
                memberCount && memberCount > 1
            }
            backgroundColor={backgroundColor}
            onClick={handleTimeBlockClick}
          />
        ))}
      </div>
    </div>
  );
}

export function TimeBlock({
  active,
  clickedFirst,
  className,
  bgOpacity = 1,
  style,
  editable,
  isPossibleTime = true,
  isAllMembersAvailable = false,
  backgroundColor = 'gray',
  ...rest
}: {
  active?: boolean;
  clickedFirst?: boolean;
  bgOpacity?: number;
  editable?: boolean;
  isPossibleTime?: boolean;
  isAllMembersAvailable?: boolean;
  backgroundColor: 'white' | 'gray';
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-[2rem] w-full border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-00': backgroundColor === 'white',
        },
        {
          'bg-primary-50': isPossibleTime && active,
          'bg-danger-50': !isPossibleTime && !active,
        },
        clickedFirst && {
          'border border-dashed odd:border-dashed even:border-dashed':
            clickedFirst,
          'border-primary-50 bg-primary-10': isPossibleTime,
          'border-danger-50 bg-danger-10': !isPossibleTime,
        },
        { 'bg-success-50': isAllMembersAvailable },
        className,
      )}
      style={{
        backgroundColor: editable
          ? ''
          : active && !isAllMembersAvailable
            ? `rgba(76, 101, 229, ${bgOpacity})`
            : '',
        ...style,
      }}
      {...rest}
    />
  );
}
