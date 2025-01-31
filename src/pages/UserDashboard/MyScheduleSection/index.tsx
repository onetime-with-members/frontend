import { Link } from 'react-router-dom';

import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MySchedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { IconChevronRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function MyScheduleSection() {
  const { data } = useQuery<MySchedule[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-gray-90 title-sm-300">고정 스케줄</h2>
        <Link to="/mypage/schedules" className="flex items-center text-gray-50">
          <span>더 보기</span>
          <span>
            <IconChevronRight />
          </span>
        </Link>
      </header>
      <MyTimeBlockBoard
        mode="view"
        mySchedules={data || []}
        backgroundColor="white"
      />
    </section>
  );
}
