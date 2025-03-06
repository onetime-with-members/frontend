import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import EverytimeUI from '../../components/EverytimeUI/EverytimeUI';
import SleepTimeAccordion from './SleepTimeAccordion/SleepTimeAccordion';
import TopAppBar from './TopAppBar/TopAppBar';
import BackButtonAlert from '@/components/alert/BackButtonAlert/BackButtonAlert';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import {
  useEverytimeSchedule,
  useEverytimeScheduleActions,
} from '@/stores/everytime-schedule';
import {
  useIsMyScheduleEdited,
  useMySchedule,
  useMyScheduleActions,
} from '@/stores/my-schedule';
import { useSleepTime, useSleepTimeActions } from '@/stores/sleep-time';
import { useToast } from '@/stores/toast';
import { MyScheduleTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function MyScheduleEditPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);

  const mySchedule = useMySchedule();
  const isMyScheduleEdited = useIsMyScheduleEdited();
  const { setMySchedule, setIsMyScheduleEdited } = useMyScheduleActions();

  const everytimeSchedule = useEverytimeSchedule();
  const { setEverytimeSchedule } = useEverytimeScheduleActions();

  const toast = useToast();

  const sleepTime = useSleepTime();
  const { setSleepTime } = useSleepTimeActions();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data } = useQuery<MyScheduleTimeType[]>({
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
      navigate(-1);
    },
  });

  const editSleepTime = useMutation({
    mutationFn: async () => {
      const res = await axios.put('/users/sleep-time', sleepTime);
      return res.data.payload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  function handleCloseButtonClick() {
    if (isMyScheduleEdited) {
      setIsBackButtonAlertOpen(true);
    } else {
      navigate(-1);
    }
  }

  async function handleSubmitButtonClick() {
    editMySchedule.mutate();
    editSleepTime.mutate();
  }

  useEffect(() => {
    setMySchedule(
      mySchedule.map((schedule) => ({
        ...schedule,
        times: Array.from(
          new Set([
            ...schedule.times,
            ...(data?.find((s) => s.time_point === schedule.time_point)
              ?.times || []),
          ]),
        ).sort(),
      })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setMySchedule]);

  useEffect(() => {
    if (everytimeSchedule.length === 0) return;
    setMySchedule(
      mySchedule.map((schedule) => ({
        ...schedule,
        times: Array.from(
          new Set([
            ...schedule.times,
            ...(everytimeSchedule.find(
              (s) => s.time_point === schedule.time_point,
            )?.times || []),
          ]),
        ).sort(),
      })),
    );
    setEverytimeSchedule([]);
    toast(t('toast.everytime'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [everytimeSchedule, data, toast, setMySchedule, setEverytimeSchedule, t]);

  return (
    <>
      <Helmet>
        <title>{t('myScheduleEdit.myScheduleEdit')} | OneTime</title>
      </Helmet>

      <div className="flex flex-col">
        <TopAppBar
          onBackButtonClick={handleCloseButtonClick}
          onSubmitButtonClick={handleSubmitButtonClick}
        />

        <main className="pb-24">
          <div className="mx-auto max-w-screen-sm">
            <EverytimeUI className="sticky top-[64px] z-20" />
            <SleepTimeAccordion
              sleepTime={sleepTime}
              setSleepTime={setSleepTime}
              isAccordionOpen={isAccordionOpen}
              setIsAccordionOpen={setIsAccordionOpen}
            />
            <MyTimeBlockBoard
              mode="edit"
              mySchedule={mySchedule}
              setMySchedule={setMySchedule}
              className="pb-16 pl-2 pr-3"
              topDateGroupClassName={cn('sticky top-[176px] z-10 bg-gray-00', {
                'top-[239px] ': isAccordionOpen,
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
