import { useContext } from 'react';

import BoardContent from './BoardContent';
import LeftTimeLine from './LeftTimeLine';
import OverlayCover from './OverlayCover';
import TopDateGroup from './TopDateGroup';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';
import { MyNewSchedule, MySchedule } from '@/types/schedule.type';

interface MyTimeBlockBoard {
  mode: 'view' | 'create' | 'edit';
  mySchedules: MySchedule[];
  setMyNewSchedule?: (newSchedule: MyNewSchedule['schedules']) => void;
  handleDeleteButtonClick?: () => void;
  handleEditButtonClick?: () => void;
  editedScheduleId?: number;
  className?: string;
  backgroundColor?: 'gray' | 'white';
  topDateGroupClassName?: string;
}

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
  setMyNewSchedule,
  editedScheduleId = -1,
  className,
  backgroundColor = 'gray',
  topDateGroupClassName,
}: MyTimeBlockBoard) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return (
    <div className={className}>
      {mode === 'view' && selectedTimeBlockId !== null && <OverlayCover />}
      <div className="flex flex-col">
        <TopDateGroup className={topDateGroupClassName} />
        <div className="flex flex-1">
          <LeftTimeLine />
          <BoardContent
            mode={mode}
            mySchedules={mySchedules}
            setMyNewSchedule={setMyNewSchedule}
            editedScheduleId={editedScheduleId}
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
    </div>
  );
}
