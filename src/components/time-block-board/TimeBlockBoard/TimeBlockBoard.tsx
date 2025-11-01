import { CSSProperties } from 'react';

import TimeBlockBoardContent from './TimeBlockBoardContent';
import { EventType } from '@/features/event/types';
import TimeBlockBoardContextProvider from '@/features/schedule/contexts/TimeBlockBoardContext';
import { ScheduleType } from '@/features/schedule/types';

export default function TimeBlockBoard({
  event,
  schedules,
  setSchedules = () => {},
  editable = false,
  backgroundColor = 'gray',
  topContentClassName = '',
  topContentStyle = {},
  bottomContentClassName = '',
  isEdited = false,
  setIsEdited = () => {},
  initialSchedule = [],
  isScheduleEmpty = false,
  isNewGuest = false,
}: {
  event: EventType;
  schedules: ScheduleType[];
  setSchedules?: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  editable?: boolean;
  backgroundColor?: 'white' | 'gray';
  topContentClassName?: string;
  topContentStyle?: CSSProperties;
  bottomContentClassName?: string;
  isEdited?: boolean;
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  initialSchedule?: ScheduleType[];
  isScheduleEmpty?: boolean;
  isNewGuest?: boolean;
}) {
  return (
    <TimeBlockBoardContextProvider
      schedules={schedules}
      initialSchedule={initialSchedule}
      event={event}
      editable={editable}
      setSchedules={setSchedules}
      isEdited={isEdited}
      setIsEdited={setIsEdited}
      backgroundColor={backgroundColor}
      topContentClassName={topContentClassName}
      topContentStyle={topContentStyle}
      bottomContentClassName={bottomContentClassName}
      isScheduleEmpty={isScheduleEmpty}
      isNewGuest={isNewGuest}
    >
      <TimeBlockBoardContent />
    </TimeBlockBoardContextProvider>
  );
}
