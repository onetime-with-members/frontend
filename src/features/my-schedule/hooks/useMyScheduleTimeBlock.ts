import { useTranslations } from 'next-intl';
import { useContext, useEffect } from 'react';

import { useMyScheduleQuery } from '../api/my-schedule.queries';
import { EverytimeScheduleContext } from '@/contexts/everytime-schedule';
import { MyScheduleContext } from '@/contexts/my-schedule';
import { TimeType } from '@/features/schedule/models';
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
      prevMySchedule.map(
        (schedule) =>
          new TimeType({
            time_point: schedule.timePoint,
            times: Array.from(
              new Set([
                ...schedule.times,
                ...((!isMyScheduleEdited &&
                  myScheduleData?.find(
                    (s) => s.timePoint === schedule.timePoint,
                  )?.times) ||
                  []),
                ...(everytimeSchedule.find(
                  (s) => s.timePoint === schedule.timePoint,
                )?.times || []),
              ]),
            ).sort(),
          }),
      ),
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
