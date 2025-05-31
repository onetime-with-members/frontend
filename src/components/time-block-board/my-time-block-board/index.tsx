import BoardContent from './board-content';
import LeftTimeLabels from './left-time-labels';
import TopDateGroup from './top-date-group';
import { MyScheduleTimeType } from '@/lib/types';

export default function MyTimeBlockBoard({
  mode,
  mySchedule,
  setMySchedule,
  className,
  backgroundColor = 'gray',
  topDateGroupClassName,
  setIsEdited,
}: {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule?: (mySchedule: MyScheduleTimeType[]) => void;
  className?: string;
  backgroundColor?: 'gray' | 'white';
  topDateGroupClassName?: string;
  setIsEdited?: (isEdited: boolean) => void;
}) {
  return (
    <div className={className}>
      <div className="flex flex-col">
        <TopDateGroup className={topDateGroupClassName} />
        <div className="flex flex-1">
          <LeftTimeLabels />
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
