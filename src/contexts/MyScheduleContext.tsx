import { createContext, useState } from 'react';

import axios from '../api/axios';
import { MyScheduleDetail } from '../types/schedule.type';
import { useQuery } from '@tanstack/react-query';

interface MyScheduleContextType {
  selectedTimeBlockId: number | null;
  setSelectedTimeBlockId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedTimeBlock: MyScheduleDetail | null;
}

export const MyScheduleContext = createContext<MyScheduleContextType>({
  selectedTimeBlockId: null,
  setSelectedTimeBlockId: () => {},
  selectedTimeBlock: null,
});

export function MyScheduleContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTimeBlockId, setSelectedTimeBlockId] = useState<number | null>(
    null,
  );

  const { data } = useQuery({
    queryKey: ['fixed-schedules', selectedTimeBlockId],
    queryFn: async () => {
      const res = await axios.get(`/fixed-schedules/${selectedTimeBlockId}`);
      return res.data;
    },
    enabled: selectedTimeBlockId !== null,
  });

  const selectedTimeBlock = data?.payload;

  return (
    <MyScheduleContext.Provider
      value={{ selectedTimeBlockId, setSelectedTimeBlockId, selectedTimeBlock }}
    >
      {children}
    </MyScheduleContext.Provider>
  );
}
