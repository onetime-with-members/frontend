import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import EventDeleteAlert from './EventDeleteAlert/EventDeleteAlert';
import LoginAlert from './LoginAlert/LoginAlert';
import MainContent from './MainContent/MainContent';
import SharePopUp from './SharePopUp/SharePopUp';
import TopNavBar from './TopNavBar';
import TopToolbar from './TopToolbar/TopToolbar';
import { EventType } from '@/types/event.type';
import axios from '@/utils/axios';
import { sortWeekdayList } from '@/utils/weekday';
import { useQuery } from '@tanstack/react-query';

export default function EventDetailPage() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const {
    isPending: isEventPending,
    data: eventData,
    error: eventError,
  } = useQuery<EventType>({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data.payload;
    },
    retry: false,
  });

  let event: EventType = eventData || ({} as EventType);
  if (event) {
    if (event?.category === 'DAY') {
      event.ranges = sortWeekdayList(event.ranges);
    } else {
      event.ranges = event.ranges?.sort();
    }
  }

  function handleBottomButtonClick() {
    if (localStorage.getItem('access-token')) {
      navigate(`/events/${params.eventId}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  function handleShareButtonClick() {
    setIsSharePopUpOpen(true);
  }

  useEffect(() => {
    if (eventError) {
      const error = eventError as AxiosError;
      if (error.response?.status === 404 || error.response?.status === 400) {
        navigate('/not-found');
      }
    }
  }, [eventError]);

  return (
    <>
      {!isEventPending && event && !eventError && (
        <Helmet>
          <title>{event.title} | OneTime</title>
        </Helmet>
      )}
      <div className="flex flex-col">
        <TopNavBar />
        <TopToolbar
          event={event}
          isEventPending={isEventPending}
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          handleShareButtonClick={handleShareButtonClick}
        />
        <MainContent event={event} isEventPending={isEventPending} />
        <>
          <BottomButtonForMobile
            handleFloatingButtonClick={handleBottomButtonClick}
            handleShareButtonClick={handleShareButtonClick}
          />
          <BottomButtonForDesktop
            handleFloatingButtonClick={handleBottomButtonClick}
          />
        </>
      </div>
      {isSharePopUpOpen && event && (
        <SharePopUp setIsOpen={setIsSharePopUpOpen} event={event} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
