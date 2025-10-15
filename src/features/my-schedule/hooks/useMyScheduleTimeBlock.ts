import { useTranslations } from 'next-intl';
import { useContext, useEffect } from 'react';

import { useMyScheduleQuery } from '../api';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { MyScheduleContext } from '@/contexts/my-schedule';
import useToast from '@/hooks/useToast';

export default function useMyScheduleTimeBlock() {
  const {
    mySchedule,
    setMySchedule,
    isMyScheduleEdited,
    setIsMyScheduleEdited,
  } = useContext(MyScheduleContext);
  const { everytimeSchedule, setEverytimeSchedule } = useContext(
    EverytimeScheduleContext,
  );

  const { data: myScheduleData } = useMyScheduleQuery();

  const t = useTranslations('toast');

  const toast = useToast();

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
      toast(t('everytime'));
    }
  }, [myScheduleData, isMyScheduleEdited, everytimeSchedule]);

  return {
    mySchedule,
    setMySchedule,
    setIsMyScheduleEdited,
  };
}
