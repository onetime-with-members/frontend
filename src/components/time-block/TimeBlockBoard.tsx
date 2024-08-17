import dayjs from 'dayjs';
import { useState } from 'react';

import { Schedule } from '../../types/schedule.type';
import TimeBlockDialog from '../dialog/TimeBlockDialog';
import TBDayLine from './TBDayLine';
import TBLeftLabelLine from './TBLeftLabelLine';
import { IconTriangleFilled } from '@tabler/icons-react';

interface TimeBlockBoardProps {
  startTime: string;
  endTime: string;
  schedules: Schedule[];
  setSchedules?: React.Dispatch<React.SetStateAction<Schedule[]>>;
  editable?: boolean;
}

export default function TimeBlockBoard({
  startTime,
  endTime,
  schedules,
  setSchedules,
  editable,
}: TimeBlockBoardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleSetTime(day: string) {
    if (!editable || !setSchedules) return () => {};
    return function (time: Schedule['time'][0]) {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.day === day
            ? schedule.time.includes(time)
              ? { ...schedule, time: schedule.time.filter((t) => t !== time) }
              : { ...schedule, time: [...schedule.time, time] }
            : schedule,
        ),
      );
    };
  }

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  function handleTimeBlockClick(time: Schedule['time'][0]) {
    if (editable) {
      handleSetTime(time);
    } else {
      handleDialogOpen();
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="title-sm-300 text-gray-90">가능한 스케줄</h2>
        <div className="flex items-center gap-8">
          <IconTriangleFilled size={12} className="-rotate-90 text-gray-90" />
          <IconTriangleFilled size={12} className="rotate-90 text-gray-90" />
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <TBLeftLabelLine
          startHour={dayjs(startTime, 'HH:mm').hour()}
          endHour={dayjs(endTime, 'HH:mm').hour()}
        />
        <div className="flex w-full gap-3">
          {schedules.map((schedule) => (
            <TBDayLine
              key={schedule.day}
              weekday={schedule.day}
              startTime={startTime}
              endTime={endTime}
              times={schedule.time}
              handleTimeBlockClick={handleTimeBlockClick}
            />
          ))}
        </div>
      </div>
      {isDialogOpen && <TimeBlockDialog onClose={handleDialogClose} />}
    </>
  );
}
