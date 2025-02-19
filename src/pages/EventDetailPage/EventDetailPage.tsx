import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import EventDeleteAlert from './EventDeleteAlert/EventDeleteAlert';
import { useParticipantsActions } from './EventDetailPage.store';
import LoginAlert from './LoginAlert/LoginAlert';
import MainContent from './MainContent/MainContent';
import SharePopUp from './SharePopUp/SharePopUp';
import TopNavBar from './TopNavBar/TopNavBar';
import TopToolbar from './TopToolbar/TopToolbar';
import { useEventQuery } from '@/queries/event.queries';
import { useScheduleQuery } from '@/queries/schedule.queries';

export default function EventDetailPage() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { setParticipants } = useParticipantsActions();

  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const {
    isPending: isEventPending,
    data: event,
    error: eventError,
  } = useEventQuery(params.eventId);

  const { data: schedules } = useScheduleQuery(event);

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

  useEffect(() => {
    setParticipants(schedules || []);
  }, [schedules]);

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
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          handleShareButtonClick={handleShareButtonClick}
        />

        <MainContent event={event} isEventPending={isEventPending} />

        <BottomButtonForMobile
          handleFloatingButtonClick={handleBottomButtonClick}
          handleShareButtonClick={handleShareButtonClick}
        />
        <BottomButtonForDesktop
          handleFloatingButtonClick={handleBottomButtonClick}
        />
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
