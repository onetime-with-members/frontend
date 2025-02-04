import { useEffect } from 'react';

import AccordionContent from './AccordionContent';
import AccordionMain from './AccordionMain';
import { SleepTime } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface SleepTimeUIProps {
  sleepTime: SleepTime;
  setSleepTime: React.Dispatch<React.SetStateAction<SleepTime>>;
  isAccordionOpen: boolean;
  setIsAccordionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SleepTimeAccordion({
  sleepTime,
  setSleepTime,
  isAccordionOpen,
  setIsAccordionOpen,
}: SleepTimeUIProps) {
  const { data } = useQuery<SleepTime>({
    queryKey: ['users', 'sleep-time'],
    queryFn: async () => {
      const res = await axios.get('/users/sleep-time');
      return res.data.payload;
    },
  });

  useEffect(() => {
    if (!data) return;
    setSleepTime(data);
  }, [data]);

  return (
    <div className="sticky top-[64px] z-20 flex flex-col gap-3 bg-gray-05 px-5 py-4">
      <AccordionMain
        isAccordionOpen={isAccordionOpen}
        setIsAccordionOpen={setIsAccordionOpen}
      />
      {isAccordionOpen && (
        <AccordionContent sleepTime={sleepTime} setSleepTime={setSleepTime} />
      )}
    </div>
  );
}
