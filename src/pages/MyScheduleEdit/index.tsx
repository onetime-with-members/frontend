import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SleepTimeUI from './SleepTimeUI';
import TopAppBar from './TopAppBar';
import BackButtonAlert from '@/components/alert/BackButtonAlert';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MyScheduleTime } from '@/types/schedule.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function MyScheduleEdit() {
  const [mySchedule, setMySchedule] = useState<MyScheduleTime[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isMyScheduleEdited, setIsMyScheduleEdited] = useState(false);

  const navigate = useNavigate();

  const { data } = useQuery<MyScheduleTime[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  const editMySchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.put('/fixed-schedules', {
        schedules: mySchedule,
      });
      return res.data.payload;
    },
    onSuccess: () => {
      navigate(-1);
    },
  });

  function handleCloseButtonClick() {
    if (isMyScheduleEdited) {
      setIsBackButtonAlertOpen(true);
    } else {
      navigate(-1);
    }
  }

  function handleSubmitButtonClick() {
    editMySchedule.mutate();
  }

  useEffect(() => {
    setMySchedule(data || []);
  }, [data]);

  return (
    <>
      <div className="flex flex-col">
        <TopAppBar
          onBackButtonClick={handleCloseButtonClick}
          onSubmitButtonClick={handleSubmitButtonClick}
        />

        <main className="pb-24">
          <div className="mx-auto max-w-screen-sm">
            <SleepTimeUI
              isAccordionOpen={isAccordionOpen}
              setIsAccordionOpen={setIsAccordionOpen}
            />
            <MyTimeBlockBoard
              mode="edit"
              mySchedule={mySchedule}
              setMySchedule={setMySchedule}
              className="pb-16 pl-2 pr-3"
              topDateGroupClassName={cn('sticky top-[120px] z-10 bg-gray-00', {
                'top-[183px] ': isAccordionOpen,
              })}
              setIsEdited={setIsMyScheduleEdited}
            />
          </div>
        </main>
      </div>

      {isBackButtonAlertOpen && (
        <BackButtonAlert backHref={-1} setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
