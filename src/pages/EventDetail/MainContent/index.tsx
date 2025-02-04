import { useParams } from 'react-router-dom';

import EmptyEventBanner from './EmptyEventBanner';
import TimeBlockBoard from '@/components/time-block-board/TimeBlockBoard';
import BannerList from '@/pages/EventDetail/MainContent/BannerList';
import { EventType } from '@/types/event.type';
import { RecommendSchedule, Schedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface MainContentProps {
  event: EventType;
  isEventPending: boolean;
}

export default function MainContent({
  event,
  isEventPending,
}: MainContentProps) {
  const params = useParams<{ eventId: string }>();

  const { isLoading: isScheduleLoading, data: schedules } = useQuery<
    Schedule[]
  >({
    queryKey: ['schedules', event?.category?.toLowerCase(), params.eventId],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}`,
      );
      return res.data.payload;
    },
    enabled: !!event,
  });

  const { isLoading: isRecommendLoading, data: recommendData } = useQuery({
    queryKey: ['events', params.eventId, 'most'],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}/most`);
      return res.data;
    },
  });

  const recommendSchedules: RecommendSchedule[] = recommendData?.payload;

  const participants: string[] =
    schedules?.map((schedule) => schedule.name).sort() || [];

  function copyEventShareLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${params.eventId}`,
    );
  }

  if (
    isEventPending ||
    isScheduleLoading ||
    isRecommendLoading ||
    event === undefined ||
    schedules === undefined ||
    recommendSchedules === undefined
  )
    return <></>;

  return (
    <div className="mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-05 px-6 pt-3">
      <main className="pb-16">
        <div className="flex flex-col gap-10">
          <TimeBlockBoard
            event={event}
            schedules={schedules}
            backgroundColor="white"
            topContentClassName="top-[123px] bg-gray-05 md:top-[136px]"
          />
          {schedules.length === 0 ? (
            <EmptyEventBanner copyEventShareLink={copyEventShareLink} />
          ) : (
            <BannerList
              eventCategory={event.category}
              recommendSchedules={recommendSchedules}
              participants={participants}
            />
          )}
        </div>
      </main>
    </div>
  );
}
