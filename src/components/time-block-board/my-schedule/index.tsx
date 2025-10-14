import BlockContent from './block-content';
import { DateIndicator, TimeIndicator } from './indicators';
import { MyScheduleTimeType } from '@/features/my-schedule/models';

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
        <DateIndicator className={topDateGroupClassName} />
        <div className="flex flex-1">
          <TimeIndicator />
          <BlockContent
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
