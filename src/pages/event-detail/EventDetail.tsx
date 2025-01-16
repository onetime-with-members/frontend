import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import EventDeleteAlert from '../../components/alert/EventDeleteAlert';
import LoginAlert from '../../components/alert/LoginAlert';
import SharePopUp from '../../components/pop-up/SharePopUp';
import { EventType } from '../../types/event.type';
import axios from '../../utils/axios';
import { sortWeekdayList } from '../../utils/weekday';
import MainContent from './components/MainContent';
import TopNavBar from './components/TopNavBar';
import BottomButtonForDesktop from './components/bottom-button/BottomButtonForDesktop';
import BottomButtonForMobile from './components/bottom-button/BottomButtonForMobile';
import TopToolbar from './components/toolbar/TopToolbar';
import { useQuery } from '@tanstack/react-query';

export default function EventDetail() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ eventId: string }>();

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
      window.location.href = `/events/${params.eventId}/schedules/new`;
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  function handleShareButtonClick() {
    setIsSharePopUpOpen(true);
  }

  return (
    <>
      {!isEventPending && event && (
        <Helmet>
          <title>{event.title} - OneTime</title>
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
        <MainContent
          event={event}
          eventError={eventError}
          isEventPending={isEventPending}
          setIsEventDeleteAlertOpen={setIsDeleteAlertOpen}
          setIsSharePopUpOpen={setIsSharePopUpOpen}
        />
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
