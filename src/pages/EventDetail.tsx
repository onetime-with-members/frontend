import { useParams } from 'react-router-dom';

import axios from '../api/axios';
import Participants from '../components/Participants';
import RecommendTime from '../components/RecommendTime';
import FloatingBottomButton from '../components/floating-button/event-detail/FloatingBottomButton';
import NavBar from '../components/nav-bar/event-detail/NavBar';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';
import { EventValue } from '../types/event.type';
import { Schedules } from '../types/schedule.type';
import { sortWeekdayList } from '../utils/weekday';
import { useQuery } from '@tanstack/react-query';

export default function EventDetail() {
  const params = useParams();

  const { isLoading: isEventPending, data: eventData } = useQuery({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  let event: EventValue = eventData?.payload;
  if (event) {
    if (event?.category === 'DAY') {
      event.ranges = sortWeekdayList(event.ranges);
    } else {
      event.ranges = event.ranges.sort();
    }
  }

  const { isLoading: isSchedulePending, data: scheduleData } = useQuery({
    queryKey: ['schedules', event?.category.toLowerCase(), params.eventId],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}`,
      );
      return res.data;
    },
    enabled: !!event,
  });

  const schedules: Schedules[] = scheduleData?.payload;

  const participants: string[] = schedules
    ?.map((schedule) => schedule.name)
    .sort();

  function copyEventShareLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${params.eventId}`,
    );
    alert('링크가 복사되었습니다.');
  }

  if (isEventPending || isSchedulePending) return <></>;

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
            <button
              className="text-md-200 rounded-xl bg-gray-90 px-4 py-2 text-gray-00"
              onClick={copyEventShareLink}
            >
              공유하기
            </button>
          </div>
          <div className="mt-4 flex items-center overflow-x-scroll">
            <div className="flex items-stretch gap-4">
              <RecommendTime />
              <Participants participants={participants} />
            </div>
          </div>
        </header>
      </div>
      <div className="mx-auto mt-4 max-w-screen-sm px-4">
        <main className="mb-28 mt-12">
          <TimeBlockBoard event={event} schedules={schedules} />
          <FloatingBottomButton />
        </main>
      </div>
    </div>
  );
}
