import { createContext, useEffect, useState } from 'react';

import axios from '../api/axios';
import { MyScheduleDetail } from '../types/schedule.type';
import { useQuery } from '@tanstack/react-query';

interface MyScheduleContextType {
  selectedTimeBlockId: number | null;
  setSelectedTimeBlockId: (id: number | null) => void;
  selectedTimeBlock: MyScheduleDetail | null;
  viewMode: 'timeblock' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'timeblock' | 'list'>>;
  isSelectDisabled: boolean;
  setIsSelectDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MyScheduleContext = createContext<MyScheduleContextType>({
  selectedTimeBlockId: null,
  setSelectedTimeBlockId: () => {},
  selectedTimeBlock: null,
  viewMode: 'timeblock',
  setViewMode: () => {},
  isSelectDisabled: false,
  setIsSelectDisabled: () => {},
});

export function MyScheduleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTimeBlockId, _setSelectedTimeBlockId] = useState<
    number | null
  >(null);
  const [selectedTimeBlock, setSelectedTimeBlock] =
    useState<MyScheduleDetail | null>(null);
  const [viewMode, setViewMode] = useState<'timeblock' | 'list'>('timeblock');
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  const { data } = useQuery({
    queryKey: ['fixed-schedules', selectedTimeBlockId],
    queryFn: async () => {
      const res = await axios.get(`/fixed-schedules/${selectedTimeBlockId}`);
      return res.data;
    },
    enabled: selectedTimeBlockId !== null,
  });

  useEffect(() => {
    if (data && selectedTimeBlockId !== null) {
      setSelectedTimeBlock(data.payload);
    } else {
      setSelectedTimeBlock(null);
    }
  }, [data, selectedTimeBlockId]);

  function setSelectedTimeBlockId(id: number | null) {
    if (isSelectDisabled) {
      return;
    } else {
      _setSelectedTimeBlockId(id);
    }
  }

  return (
    <MyScheduleContext.Provider
      value={{
        selectedTimeBlockId,
        setSelectedTimeBlockId,
        selectedTimeBlock,
        viewMode,
        setViewMode,
        isSelectDisabled,
        setIsSelectDisabled,
      }}
    >
      {children}
    </MyScheduleContext.Provider>
  );
}
