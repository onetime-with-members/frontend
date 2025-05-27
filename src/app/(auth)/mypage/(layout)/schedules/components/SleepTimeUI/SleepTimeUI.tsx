import SleepIcon from '@/components/icon/SleepIcon';
import { SleepTimeType } from '@/lib/types';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function SleepTimeUI() {
  const { data } = useQuery<SleepTimeType>({
    queryKey: ['users', 'sleep-time'],
    queryFn: async () => {
      const res = await axios.get('/users/sleep-time');
      return res.data.payload;
    },
  });

  return (
    <div className="sticky top-[64px] z-10 flex h-[56px] items-center gap-1.5 rounded-t-2xl bg-primary-00 px-5 py-4 md:top-[122px]">
      <span>
        <SleepIcon fill="#4C65E5" size={20} />
      </span>
      <span className="text-primary-50 text-md-300">
        {data?.sleep_start_time} - {data?.sleep_end_time}
      </span>
    </div>
  );
}
