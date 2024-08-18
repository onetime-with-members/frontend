import dayjs from 'dayjs';
import { useState } from 'react';

import { Schedule } from '../../types/schedule.type';
import TimeBlockPopUp from '../dialog/TimeBlockPopUp';
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

  function changeTimeBlockStatus(
    day: string,
    time: Schedule['time'][0],
    newStatus: boolean,
  ) {
    if (!editable || !setSchedules) return;
    setSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.day === day) {
          let newSchedule = {
            ...schedule,
            time: schedule.time.filter((t) => t !== time),
          };
          if (newStatus !== undefined && newStatus) {
            newSchedule = {
              ...newSchedule,
              time: [...newSchedule.time, time],
            };
          } else {
            newSchedule = {
              ...newSchedule,
              time: newSchedule.time.filter((t) => t !== time),
            };
          }
          return newSchedule;
        } else {
          return schedule;
        }
      }),
    );
  }

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  function handleTimeBlockClick(
    day: Schedule['day'],
    time: Schedule['time'][0],
    newStatus: boolean,
  ) {
    if (editable) {
      changeTimeBlockStatus(day, time, newStatus);
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
      {isDialogOpen && <TimeBlockPopUp onClose={handleDialogClose} />}
    </>
  );
}
