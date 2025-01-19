import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TimeBlockBoard from '@/components/TimeBlockBoard';
import BannerList from '@/components/banner/banner-list/BannerList';
import EmptyEventBanner from '@/components/banner/empty-event/EmptyEventBanner';
import { EventType } from '@/types/event.type';
import { RecommendSchedule, Schedule } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

interface MainContentProps {
  event: EventType;
  eventError: Error | null;
  isEventPending: boolean;
  setIsEventDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSharePopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainContent({
  event,
  eventError,
  isEventPending,
}: MainContentProps) {
  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const { isLoading: isScheduleLoading, data: scheduleData } = useQuery({
    queryKey: ['schedules', event?.category?.toLowerCase(), params.eventId],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}`,
      );
      return res.data;
    },
    enabled: !!event,
  });

  const schedules: Schedule[] = scheduleData?.payload;

  const { isLoading: isRecommendLoading, data: recommendData } = useQuery({
    queryKey: ['events', params.eventId, 'most'],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}/most`);
      return res.data;
    },
  });

  const recommendSchedules: RecommendSchedule[] = recommendData?.payload;

  const participants: string[] = schedules
    ?.map((schedule) => schedule.name)
    .sort();

  function copyEventShareLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${params.eventId}`,
    );
  }

  useEffect(() => {
    if (eventError) {
      const error = eventError as AxiosError;
      if (error.response?.status === 404 || error.response?.status === 400) {
        navigate('/not-found');
      }
    }
  }, [eventError]);

  if (
    isEventPending ||
    isScheduleLoading ||
    isRecommendLoading ||
    event === undefined ||
    schedules === undefined ||
    recommendSchedules === undefined ||
    eventError
  )
    return <></>;

  return (
    <div className="mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-05 px-6">
      <main className="pb-16">
        <div className="flex flex-col gap-10">
          <TimeBlockBoard
            event={event}
            schedules={schedules}
            backgroundColor="white"
            topContentClassName="top-[123px] z-20 bg-gray-05 md:top-[136px]"
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
