import MyTimeBlockBoardContent from './MyTimeBlockBoardContent/MyTimeBlockBoardContent';
import MyTimeBlockBoardContextProvider from '@/features/my-schedule/contexts/MyTimeBlockBoardContext';
import { MyScheduleTimeType } from '@/features/my-schedule/types';

export default function MyTimeBlockBoard({
  mode,
  mySchedule,
  setMySchedule = () => {},
  className = '',
  backgroundColor = 'gray',
  topDateGroupClassName = '',
  setIsEdited = () => {},
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
    <MyTimeBlockBoardContextProvider
      mode={mode}
      mySchedule={mySchedule}
      setMySchedule={setMySchedule}
      className={className}
      backgroundColor={backgroundColor}
      topDateGroupClassName={topDateGroupClassName}
      setIsEdited={setIsEdited}
    >
      <MyTimeBlockBoardContent />
    </MyTimeBlockBoardContextProvider>
  );
}
