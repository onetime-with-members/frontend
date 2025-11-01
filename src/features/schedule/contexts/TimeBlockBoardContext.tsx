import { createContext, useEffect, useRef, useState } from 'react';

import useTimeBlockBoardActions from '../hooks/useTimeBlockBoardActions';
import { ScheduleType } from '../types';
import { timeBlockList } from '../utils';
import { defaultEvent } from '@/features/event/constants';
import { EventType } from '@/features/event/types';

export const TimeBlockBoardContext = createContext<{
  isFull: boolean;
  isEmpty: boolean;
  isPossibleTime: boolean;
  initialSchedule: ScheduleType[];
  editable: boolean;
  event: EventType;
  schedules: ScheduleType[];
  isEdited: boolean;
  backgroundColor: 'white' | 'gray';
  topContentClassName: string;
  topContentStyle: React.CSSProperties;
  bottomContentClassName: string;
  isScheduleEmpty: boolean;
  isNewGuest: boolean;
  boardContentRef: React.RefObject<HTMLDivElement | null> | null;
  topLabelRef: React.RefObject<HTMLDivElement | null> | null;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  handleAvailableToggle: () => void;
  handleClearButtonClick: () => void;
  handleReloadButtonClick: () => void;
  handleResetButtonClick: () => void;
}>({
  isEmpty: false,
  isFull: false,
  isPossibleTime: true,
  initialSchedule: [],
  editable: false,
  event: defaultEvent,
  schedules: [],
  isEdited: false,
  backgroundColor: 'gray',
  topContentClassName: '',
  topContentStyle: {},
  bottomContentClassName: '',
  isScheduleEmpty: false,
  isNewGuest: false,
  boardContentRef: null,
  topLabelRef: null,
  setIsEdited: () => {},
  setSchedules: () => {},
  handleAvailableToggle: () => {},
  handleClearButtonClick: () => {},
  handleReloadButtonClick: () => {},
  handleResetButtonClick: () => {},
});

export default function TimeBlockBoardContextProvider({
  children,
  schedules,
  setSchedules,
  initialSchedule,
  event,
  editable,
  isEdited,
  setIsEdited,
  backgroundColor,
  topContentClassName,
  topContentStyle,
  bottomContentClassName,
  isScheduleEmpty,
  isNewGuest,
}: {
  children: React.ReactNode;
  schedules: ScheduleType[];
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  initialSchedule: ScheduleType[];
  event: EventType;
  editable: boolean;
  isEdited: boolean;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColor: 'white' | 'gray';
  topContentClassName: string;
  topContentStyle: React.CSSProperties;
  bottomContentClassName: string;
  isScheduleEmpty: boolean;
  isNewGuest: boolean;
}) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isPossibleTime, setIsPossibleTime] = useState(true);

  const boardContentRef = useRef<HTMLDivElement>(null);
  const topLabelRef = useRef<HTMLDivElement>(null);

  const {
    handleAvailableToggle,
    handleClearButtonClick,
    handleReloadButtonClick,
    handleResetButtonClick,
  } = useTimeBlockBoardActions({
    editable,
    setSchedules,
    event,
    setIsEdited,
    isPossibleTime,
    setIsPossibleTime,
    isEmpty,
    isFull,
    initialSchedule,
  });

  useEffect(() => {
    if (!editable || schedules.length === 0) return;
    setIsEmpty(schedules[0].schedules.every((s) => s.times.length === 0));
    setIsFull(
      schedules[0].schedules.every(
        (s) =>
          timeBlockList(event.start_time, event.end_time).filter(
            (time) => !s.times.includes(time),
          ).length === 0,
      ),
    );
  }, [schedules, editable, event.start_time, event.end_time]);

  return (
    <TimeBlockBoardContext
      value={{
        isEmpty,
        isFull,
        isPossibleTime,
        initialSchedule,
        editable,
        event,
        schedules,
        isEdited,
        backgroundColor,
        topContentClassName,
        topContentStyle,
        bottomContentClassName,
        isScheduleEmpty,
        isNewGuest,
        boardContentRef,
        topLabelRef,
        setIsEdited,
        setSchedules,
        handleAvailableToggle,
        handleClearButtonClick,
        handleReloadButtonClick,
        handleResetButtonClick,
      }}
    >
      {children}
    </TimeBlockBoardContext>
  );
}
