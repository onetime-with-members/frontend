import TimeBlock from './TimeBlock';
import { ScheduleType } from '@/features/schedule/types';
import { timeBlockList } from '@/features/schedule/utils';
import cn from '@/lib/cn';
import { eventTarget } from '@/utils';

export default function TimeBlockLine({
  className,
  timePoint,
  startTime,
  endTime,
  schedules,
  onTimeBlockClick,
  onPopUpOpen,
  isFilled,
  isClickedFirstFor,
  timesAllMember,
  editable,
  isPossibleTime = true,
  backgroundColor,
  isBoardContentDragging,
}: {
  className?: string;
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
  onPopUpOpen: ({
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
      onPopUpOpen({ timePoint, time });
    }
  }

  return (
    <div className={cn('min-w-[52px] flex-1', className)}>
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
