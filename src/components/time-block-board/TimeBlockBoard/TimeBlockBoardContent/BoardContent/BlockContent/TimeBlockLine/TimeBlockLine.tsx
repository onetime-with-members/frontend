import { useContext } from 'react';

import TimeBlock from './TimeBlock';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import { TimeBlockPopUpContext } from '@/features/schedule/contexts/TimeBlockPopUpContext';
import { ClickedTimeBlock } from '@/features/schedule/types';
import {
  isClickedFirstFor,
  isFilled,
  timeBlockList,
  timesAllMember,
} from '@/features/schedule/utils';
import cn from '@/lib/cn';
import { eventTarget } from '@/utils';

export default function TimeBlockLine({
  className,
  timePoint,
  clickedTimeBlock,
  onTimeBlockClick,
  isBoardContentDragging,
}: {
  className?: string;
  timePoint: string;
  clickedTimeBlock: ClickedTimeBlock;
  onTimeBlockClick: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
  isBoardContentDragging?: boolean;
}) {
  const { event, schedules, editable } = useContext(TimeBlockBoardContext);
  const { handlePopUpOpen } = useContext(TimeBlockPopUpContext);

  const timeList: string[] = timeBlockList(event.start_time, event.end_time);

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
      handlePopUpOpen({ timePoint, time });
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
            active={isFilled({ schedules, timePoint, time })}
            data-time={time}
            data-timepoint={timePoint}
            clickedFirst={isClickedFirstFor({
              clickedTimeBlock,
              timePoint,
              time,
            })}
            bgOpacity={
              timesAllMember({ schedules, timePoint }).filter((t) => t === time)
                .length / memberCount
            }
            isAllMembersAvailable={
              timesAllMember({ schedules, timePoint }).filter((t) => t === time)
                .length === memberCount && memberCount > 1
            }
            onClick={handleTimeBlockClick}
          />
        ))}
      </div>
    </div>
  );
}
