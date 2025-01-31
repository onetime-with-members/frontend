import { Link } from 'react-router-dom';

import EmptyUI from '@/components/EmptyUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard';
import { MySchedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { IconChevronRight } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function FixedScheduleSection() {
  const { data: mySchedules, isPending: isMySchedulesPending } = useQuery<
    MySchedule[]
  >({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload;
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
      {isMySchedulesPending && (
        <div className="rounded-2xl py-5">
          <EmptyUI>스케줄을 불러오는 중입니다.</EmptyUI>
        </div>
      )}
      {!isMySchedulesPending && mySchedules && (
        <MyTimeBlockBoard
          mode="view"
          mySchedules={mySchedules}
          backgroundColor="white"
          className="hidden flex-1 md:block"
        />
      )}
    </section>
  );
}
