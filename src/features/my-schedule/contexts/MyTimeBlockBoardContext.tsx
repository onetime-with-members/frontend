import { createContext } from 'react';

import { MyScheduleTimeType } from '../types';

export const MyTimeBlockBoardContext = createContext<{
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule: (mySchedule: MyScheduleTimeType[]) => void;
  className: string;
  backgroundColor: 'gray' | 'white';
  topDateGroupClassName: string;
  setIsEdited: (isEdited: boolean) => void;
}>({
  mode: 'view',
  mySchedule: [],
  setMySchedule: () => {},
  className: '',
  backgroundColor: 'gray',
  topDateGroupClassName: '',
  setIsEdited: () => {},
});

export default function MyTimeBlockBoardContextProvider({
  children,
  mode,
  mySchedule,
  setMySchedule,
  className,
  backgroundColor,
  topDateGroupClassName,
  setIsEdited,
}: {
  children: React.ReactNode;
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule: (mySchedule: MyScheduleTimeType[]) => void;
  className: string;
  backgroundColor: 'gray' | 'white';
  topDateGroupClassName: string;
  setIsEdited: (isEdited: boolean) => void;
}) {
  return (
    <MyTimeBlockBoardContext.Provider
      value={{
        mode,
        mySchedule,
        setMySchedule,
        className,
        backgroundColor,
        topDateGroupClassName,
        setIsEdited,
      }}
    >
      {children}
    </MyTimeBlockBoardContext.Provider>
  );
}
