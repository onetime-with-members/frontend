import Header from './Header';
import SleepTimeUI from './SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MyScheduleTime } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleSection() {
  const { data } = useQuery<MyScheduleTime[]>({
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
        <SleepTimeUI />
        <MyTimeBlockBoard
          mode="view"
          mySchedule={data || []}
          className="pl-3 pr-6"
        />
      </div>
    </section>
  );
}
