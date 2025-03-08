import BoardContent from './BoardContent/BoardContent';
import LeftTimeLine from './LeftTimeLine/LeftTimeLine';
import TopDateGroup from './TopDateGroup/TopDateGroup';
import { MyScheduleTimeType } from '@/types/schedule.type';

interface MyTimeBlockBoard {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule?: (mySchedule: MyScheduleTimeType[]) => void;
  className?: string;
  backgroundColor?: 'gray' | 'white';
  topDateGroupClassName?: string;
  setIsEdited?: (isEdited: boolean) => void;
}

export default function MyTimeBlockBoard({
  mode,
  mySchedule,
  setMySchedule,
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
            backgroundColor={backgroundColor}
            setIsEdited={setIsEdited}
          />
        </div>
      </div>
    </div>
  );
}
