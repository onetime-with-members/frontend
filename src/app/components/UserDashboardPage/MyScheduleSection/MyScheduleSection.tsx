import { useTranslations } from 'next-intl';

import Header from '../Header/Header';
import SleepTimeUI from './SleepTimeUI/SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import useSleepTime from '@/hooks/useSleepTime';
import { MyScheduleTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleSection() {
  const { sleepTimeData } = useSleepTime();

  const t = useTranslations('userDashboard');

  const { data } = useQuery<MyScheduleTimeType[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <Header hasMore={false} description={t('myScheduleDescription')}>
        {t('mySchedule')}
      </Header>
      <div className="rounded-2xl bg-gray-00 pb-12">
        <SleepTimeUI />
        <MyTimeBlockBoard
          mode="view"
          mySchedule={data || []}
          sleepTime={sleepTimeData}
          className="pl-3 pr-6"
          topDateGroupClassName="sticky bg-gray-00 z-10 top-[64px] md:top-[136px]"
        />
      </div>
    </section>
  );
}
