import { useContext } from 'react';

import BoardContent from './BoardContent';
import LeftLabelLine from './LeftLabelLine';
import OverlayCover from './OverlayCover';
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
}

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
  setMyNewSchedule,
  editedScheduleId = -1,
  className,
  backgroundColor = 'gray',
}: MyTimeBlockBoard) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return (
    <div className={className}>
      {mode === 'view' && selectedTimeBlockId !== null && <OverlayCover />}
      <div className="flex gap-2">
        <LeftLabelLine />
        <BoardContent
          mode={mode}
          mySchedules={mySchedules}
          setMyNewSchedule={setMyNewSchedule}
          editedScheduleId={editedScheduleId}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
}
