import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from '../api/axios';
import LoginAlert from '../components/alert/LoginAlert';
import TopBannerList from '../components/banner/banner-list/TopBannerList';
import EmptyEventBanner from '../components/banner/empty-event/EmptyEventBanner';
import BlackFloatingBottomButton from '../components/floating-button/BlackFloatingBottomButton';
import NavBar from '../components/nav-bar/NavBar';
import SharePopUp from '../components/pop-up/SharePopUp';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';
import { EventType } from '../types/event.type';
import { RecommendSchedule, Schedule } from '../types/schedule.type';
import { sortWeekdayList } from '../utils/weekday';
import { useQuery } from '@tanstack/react-query';

export default function EventDetail() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams<{ eventId: string }>();

  const { isPending: isEventPending, data: eventData } = useQuery({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  let event: EventType = eventData?.payload;
  if (event) {
    if (event?.category === 'DAY') {
      event.ranges = sortWeekdayList(event.ranges);
    } else {
      event.ranges = event.ranges.sort();
    }
  }

  const { isPending: isSchedulePending, data: scheduleData } = useQuery({
    queryKey: ['schedules', event?.category.toLowerCase(), params.eventId],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}`,
      );
      return res.data;
    },
    enabled: !!event,
  });

  const schedules: Schedule[] = scheduleData?.payload;

  const { isPending: isRecommendPending, data: recommendData } = useQuery({
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

  function handleShareButtonClick() {
    setIsSharePopUpOpen(true);
  }

  function handleSharePopUpClose() {
    setIsSharePopUpOpen(false);
  }

  function handleLoginAlertClose() {
    setIsLoginAlertOpen(false);
  }

  function handleLoginAlertCancel() {
    navigate(`/events/${params.eventId}/schedules/new`);
  }

  function handleLoginAlertConfirm() {
    navigate(`/login?redirect_url=${location.pathname}`);
  }

  function handleFloatingButtonClick() {
    if (localStorage.getItem('access-token')) {
      window.location.href = `/events/${params.eventId}/schedules/new`;
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  if (
    isEventPending ||
    isSchedulePending ||
    isRecommendPending ||
    event === undefined ||
    schedules === undefined ||
    recommendSchedules === undefined
  )
    return <></>;

  return (
    <>
      <Helmet>
        <title>{event.title} - OneTime</title>
      </Helmet>
      <div>
        <div
          className="px-4 py-6"
          style={{
            background: 'linear-gradient(0deg, #334EDB 0%, #8898F2 100%)',
          }}
        >
          <header className="mx-auto max-w-screen-sm">
            <NavBar />
            <div className="flex items-center justify-between gap-2">
              <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 title-md-300">
                {event.title}
              </h1>
              <button
                className="rounded-xl bg-gray-90 px-4 py-2 text-gray-00 text-md-200"
                onClick={handleShareButtonClick}
              >
                공유하기
              </button>
            </div>
            {schedules.length === 0 ? (
              <EmptyEventBanner copyEventShareLink={copyEventShareLink} />
            ) : (
              <TopBannerList
                eventCategory={event.category}
                recommendSchedules={recommendSchedules}
                participants={participants}
              />
            )}
          </header>
        </div>
        <div className="mx-auto mt-4 max-w-screen-sm px-4">
          <main className="mb-28 mt-12">
            <TimeBlockBoard event={event} schedules={schedules} />
            <BlackFloatingBottomButton onClick={handleFloatingButtonClick} />
          </main>
        </div>
      </div>
      {isSharePopUpOpen && (
        <SharePopUp onClose={handleSharePopUpClose} event={event} />
      )}
      {isLoginAlertOpen && (
        <LoginAlert
          onClose={handleLoginAlertClose}
          onCancel={handleLoginAlertCancel}
          onConfirm={handleLoginAlertConfirm}
        />
      )}
    </>
  );
}
