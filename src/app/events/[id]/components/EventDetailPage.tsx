'use client';

import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

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
import { useParams, useRouter } from 'next/navigation';

export default function EventDetailPage() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { setParticipants } = useParticipantsActions();

  const params = useParams<{ id: string }>();
  const router = useRouter();

  const {
    isPending: isEventPending,
    data: event,
    error: eventError,
  } = useEventQuery(params.id);
  const { data: schedules } = useScheduleQuery(event);

  function handleBottomButtonClick() {
    if (!!getCookie('access-token')) {
      router.push(`/events/${params.id}/schedules/new`);
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
        router.push('/not-found');
      }
    }
  }, [eventError, router]);

  useEffect(() => {
    setParticipants(schedules || []);
  }, [schedules, setParticipants]);

  return (
    <>
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
        <SharePopUp setIsOpen={setIsSharePopUpOpen} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
