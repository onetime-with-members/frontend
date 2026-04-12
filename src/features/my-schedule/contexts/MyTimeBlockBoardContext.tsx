import { createContext } from 'react';

import { MyScheduleTimeType } from '../types';

export const MyTimeBlockBoardContext = createContext<{
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule: (mySchedule: MyScheduleTimeType[]) => void;
  className: string;
  backgroundColor: 'gray' | 'white';
  topDateGroupClassName: string;
  topDateGroupStyle: React.CSSProperties;
  setIsEdited: (isEdited: boolean) => void;
}>({
  mode: 'view',
  mySchedule: [],
  setMySchedule: () => {},
  className: '',
  backgroundColor: 'gray',
  topDateGroupClassName: '',
  topDateGroupStyle: {},
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
  topDateGroupStyle,
  setIsEdited,
}: {
  children: React.ReactNode;
  mode: 'view' | 'edit';
  mySchedule: MyScheduleTimeType[];
  setMySchedule: (mySchedule: MyScheduleTimeType[]) => void;
  className: string;
  backgroundColor: 'gray' | 'white';
  topDateGroupClassName: string;
  topDateGroupStyle: React.CSSProperties;
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
        topDateGroupStyle,
        setIsEdited,
      }}
    >
      {children}
    </MyTimeBlockBoardContext.Provider>
  );
}
