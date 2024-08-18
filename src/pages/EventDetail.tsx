import { useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../api/axios';
import Participants from '../components/Participants';
import RecommendTime from '../components/RecommendTime';
import FloatingBottomButton from '../components/floating-button/event-detail/FloatingBottomButton';
import NavBar from '../components/nav-bar/event-detail/NavBar';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';
import { Schedule } from '../types/schedule.type';
import { useQuery } from '@tanstack/react-query';

export default function EventDetail() {
  const [schedules] = useState<Schedule[]>([
    { day: '일', time: [] },
    { day: '월', time: [] },
    { day: '화', time: [] },
    { day: '수', time: [] },
    { day: '목', time: [] },
  ]);

  const params = useParams();

  const startTime = '09:00';
  const endTime = '23:00';

  const { isPending, data } = useQuery({
    queryKey: ['event', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  if (isPending) return <></>;

  const event = data.payload;

  return (
    <div>
      <div
        className="px-4 py-6"
        style={{
          background: 'linear-gradient(0deg, #334EDB 0%, #8898F2 100%)',
        }}
      >
        <header className="mx-auto max-w-screen-sm">
          <NavBar />
          <div className="flex items-center justify-between">
            <h1 className="title-md-300 text-gray-00">{event.title}</h1>
            <button className="text-md-200 rounded-xl bg-gray-90 px-4 py-2 text-gray-00">
              공유하기
            </button>
          </div>
          <div className="mt-4 flex items-center overflow-x-scroll">
            <div className="flex items-stretch gap-4">
              <RecommendTime />
              <Participants />
            </div>
          </div>
        </header>
      </div>
      <div className="mx-auto mt-4 max-w-screen-sm px-4">
        <main className="mb-28 mt-12">
          <TimeBlockBoard
            schedules={schedules}
            startTime={startTime}
            endTime={endTime}
          />
          <FloatingBottomButton />
        </main>
      </div>
    </div>
  );
}
