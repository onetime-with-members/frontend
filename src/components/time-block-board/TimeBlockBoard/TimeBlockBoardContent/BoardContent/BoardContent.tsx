import { useContext } from 'react';

import BlockContent from './BlockContent';
import TimeIndicator from './TimeIndicator';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import { ScheduleType } from '@/features/schedule/types';
import cn from '@/lib/cn';

export default function BoardContent({
  onPopUpOpen,
}: {
  onPopUpOpen: ({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) => void;
}) {
  const {
    editable,
    setSchedules,
    isEdited,
    setIsEdited,
    bottomContentClassName,
  } = useContext(TimeBlockBoardContext);

  function changeTimeBlockStatus(
    day: string,
    time: ScheduleType['schedules'][0]['times'][0],
    newStatus: boolean,
  ) {
    if (!editable) return;
    editTimeBlock();
    changeIsEdited();

    function editTimeBlock() {
      if (!setSchedules) return;
      setSchedules((prev) => [
        {
          name: prev[0].name,
          schedules: prev[0].schedules.map((schedule) => ({
            ...schedule,
            times:
              schedule.time_point === day
                ? newStatus
                  ? Array.from(new Set([...schedule.times, time])).sort()
                  : schedule.times.filter((t) => t !== time)
                : schedule.times,
          })),
        },
      ]);
    }

    function changeIsEdited() {
      if (isEdited === undefined || !setIsEdited) return;
      setIsEdited(true);
    }
  }

  return (
    <div
      className={cn('relative flex overflow-hidden', bottomContentClassName)}
    >
      <TimeIndicator />
      <BlockContent
        changeTimeBlockStatus={changeTimeBlockStatus}
        onPopUpOpen={onPopUpOpen}
      />
    </div>
  );
}
