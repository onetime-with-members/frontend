import { useContext } from 'react';

import BoardContent from './BoardContent';
import LeftTimeLine from './LeftTimeLine';
import TopDateGroup from './TopDateGroup';
import Overlay from '@/components/overlay/Overlay';
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
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyTimeBlockBoard({
  mode,
  mySchedules,
  setMyNewSchedule,
  editedScheduleId = -1,
  className,
  backgroundColor = 'gray',
  topDateGroupClassName,
  setIsEdited,
}: MyTimeBlockBoard) {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return (
    <div className={className}>
      {mode === 'view' && selectedTimeBlockId !== null && <Overlay />}
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
            setIsEdited={setIsEdited}
          />
        </div>
      </div>
    </div>
  );
}
