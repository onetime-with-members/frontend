import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MySchedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function MySchedules() {
  const { data } = useQuery<MySchedule[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <div className="mx-auto w-full max-w-screen-md pb-32">
      <div>
        <MyTimeBlockBoard
          mode="view"
          mySchedules={data || []}
          topDateGroupClassName="sticky z-10 bg-gray-00 top-[64px] md:top-[122px]"
        />
      </div>
    </div>
  );
}
