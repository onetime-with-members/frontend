'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import SleepTimeAccordion from './sleep-time-accordion';
import BackButtonAlert from '@/components/alert/back-button-alert';
import SmallButton from '@/components/button/small-button';
import EverytimeUI from '@/components/everytime-ui';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { MyScheduleContext } from '@/contexts/my-schedule';
import { SleepTimeContext } from '@/contexts/sleep-time';
import useToast from '@/hooks/useToast';
import { editMyScheduleApi, editSleepTimeApi } from '@/lib/api/actions';
import { myScheduleQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function MyScheduleEditPage() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);

  const {
    mySchedule,
    setMySchedule,
    isMyScheduleEdited,
    setIsMyScheduleEdited,
  } = useContext(MyScheduleContext);
  const { sleepTime, setSleepTime } = useContext(SleepTimeContext);
  const { everytimeSchedule, setEverytimeSchedule } = useContext(
    EverytimeScheduleContext,
  );

  const queryClient = useQueryClient();

  const toast = useToast();

  const router = useRouter();
  const t = useTranslations();

  const { data: myScheduleData } = useQuery({
    ...myScheduleQueryOptions,
  });

  const { mutateAsync: editMySchedule } = useMutation({
    mutationFn: editMyScheduleApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fixed-schedules'] });
    },
  });
  const { mutateAsync: editSleepTime } = useMutation({
    mutationFn: editSleepTimeApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      router.back();
    },
  });

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    await editMySchedule(mySchedule);
    await editSleepTime(sleepTime);
  }

  useEffect(() => {
    setMySchedule((prevMySchedule) =>
      prevMySchedule.map((schedule) => ({
        ...schedule,
        times: Array.from(
          new Set([
            ...schedule.times,
            ...((!isMyScheduleEdited &&
              myScheduleData?.find((s) => s.time_point === schedule.time_point)
                ?.times) ||
              []),
            ...(everytimeSchedule.find(
              (s) => s.time_point === schedule.time_point,
            )?.times || []),
          ]),
        ).sort(),
      })),
    );
    if (everytimeSchedule.length > 0) {
      setEverytimeSchedule([]);
      setIsMyScheduleEdited(true);
      toast(t('toast.everytime'));
    }
  }, [myScheduleData, isMyScheduleEdited, everytimeSchedule]);

  return (
    <>
      <div className="flex flex-col">
        {/* Top App Bar */}
        <nav className="h-[64px]">
          <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
            <div className="mx-auto grid w-full max-w-screen-sm grid-cols-3">
              <div className="flex items-center justify-start">
                <button
                  onClick={() => {
                    if (isMyScheduleEdited) {
                      setIsBackButtonAlertOpen(true);
                    } else {
                      router.back();
                    }
                  }}
                >
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
                {t('myScheduleEdit.editMySchedule')}
              </div>
              <div className="flex items-center justify-end">
                <SmallButton onClick={() => handleSubmit()}>
                  {t('myScheduleEdit.done')}
                </SmallButton>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pb-24">
          <form className="mx-auto max-w-screen-sm">
            <EverytimeUI className="sticky top-[64px] z-20 rounded-t-2xl" />
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
          </form>
        </main>
      </div>

      {/* Back Button Alert */}
      {isBackButtonAlertOpen && (
        <BackButtonAlert backHref={-1} setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
