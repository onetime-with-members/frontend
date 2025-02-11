import Header from './Header';
import SleepTimeUI from './SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';
import useSleepTime from '@/hooks/useSleepTime';
import { MyScheduleTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleSection() {
  const { sleepTime, setSleepTime } = useSleepTime();

  const { data } = useQuery<MyScheduleTimeType[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <Header />
      <div className="rounded-2xl bg-gray-00 pb-12">
        <SleepTimeUI sleepTime={sleepTime} setSleepTime={setSleepTime} />
        <MyTimeBlockBoard
          mode="view"
          mySchedule={data || []}
          sleepTime={sleepTime}
          className="pl-3 pr-6"
        />
      </div>
    </section>
  );
}
