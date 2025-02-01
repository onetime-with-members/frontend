import SleepIcon from '@/components/icon/SleepIcon';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MyScheduleTime } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MySchedule() {
  const { data } = useQuery<MyScheduleTime[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      <div className="flex items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4">
        <div>
          <SleepIcon fill="#4C65E5" size={20} />
        </div>
        <div className="text-primary-50 text-md-300">03:00 - 10:00</div>
      </div>
      <div className="bg-gray-05 pr-3">
        <MyTimeBlockBoard
          mode="view"
          backgroundColor="white"
          mySchedule={data || []}
          topDateGroupClassName="sticky z-10 bg-gray-05 top-[64px] md:top-[122px]"
        />
      </div>
    </div>
  );
}
