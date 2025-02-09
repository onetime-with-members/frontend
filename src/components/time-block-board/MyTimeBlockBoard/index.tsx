import BoardContent from './BoardContent';
import LeftTimeLine from './LeftTimeLine';
import TopDateGroup from './TopDateGroup';
import { MyScheduleTimeType } from '@/types/schedule.type';
import { SleepTimeType } from '@/types/user.type';

interface MyTimeBlockBoard {
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule?: React.Dispatch<React.SetStateAction<MyScheduleTimeType[]>>;
  sleepTime?: SleepTimeType;
  className?: string;
  backgroundColor?: 'gray' | 'white';
  topDateGroupClassName?: string;
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyTimeBlockBoard({
  mode,
  mySchedule,
  setMySchedule,
  sleepTime,
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
          <LeftTimeLine sleepTime={sleepTime} />
          <BoardContent
            mode={mode}
            mySchedule={mySchedule}
            setMySchedule={setMySchedule}
            sleepTime={sleepTime}
            backgroundColor={backgroundColor}
            setIsEdited={setIsEdited}
          />
        </div>
      </div>
    </div>
  );
}
