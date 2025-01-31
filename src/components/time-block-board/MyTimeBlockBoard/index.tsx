import BoardContent from './BoardContent';
import LeftTimeLine from './LeftTimeLine';
import TopDateGroup from './TopDateGroup';
import { MyNewSchedule, MySchedule } from '@/types/schedule.type';

interface MyTimeBlockBoard {
  mode: 'view' | 'create' | 'edit';
  mySchedule: MySchedule[];
  setMySchedule?: React.Dispatch<React.SetStateAction<MySchedule[]>>;
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
  mySchedule,
  setMySchedule,
  setMyNewSchedule,
  editedScheduleId = -1,
  className,
  backgroundColor = 'gray',
  topDateGroupClassName,
  setIsEdited,
}: MyTimeBlockBoard) {
  return (
    <div className={className}>
      <div className="flex flex-col">
        <TopDateGroup className={topDateGroupClassName} />
        <div className="flex flex-1">
          <LeftTimeLine />
          <BoardContent
            mode={mode}
            mySchedule={mySchedule}
            setMySchedule={setMySchedule}
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
