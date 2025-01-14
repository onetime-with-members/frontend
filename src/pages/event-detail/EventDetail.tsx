import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';
import EventDeleteAlert from '../../components/alert/EventDeleteAlert';
import LoginAlert from '../../components/alert/LoginAlert';
import SharePopUp from '../../components/pop-up/SharePopUp';
import { EventType } from '../../types/event.type';
import { sortWeekdayList } from '../../utils/weekday';
import MainContent from './components/MainContent';
import TopNavBar from './components/TopNavBar';
import BottomButtonGroup from './components/bottom-button/BottomButtonGroup';
import TopToolbar from './components/toolbar/TopToolbar';
import { useQuery } from '@tanstack/react-query';

export default function EventDetail() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isEventDeleteAlertOpen, setIsEventDeleteAlertOpen] = useState(false);

  const params = useParams<{ eventId: string }>();

  const {
    isPending: isEventPending,
    data: eventData,
    error: eventError,
  } = useQuery({
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

  if (isEventPending || !event) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{event.title} - OneTime</title>
      </Helmet>
      <div className="flex flex-col">
        <TopNavBar />
        <TopToolbar event={event} setIsSharePopUpOpen={setIsSharePopUpOpen} />
        <MainContent
          event={event}
          eventError={eventError}
          isEventPending={isEventPending}
          setIsEventDeleteAlertOpen={setIsEventDeleteAlertOpen}
          setIsSharePopUpOpen={setIsSharePopUpOpen}
        />
        <BottomButtonGroup setIsLoginAlertOpen={setIsLoginAlertOpen} />
      </div>
      {isSharePopUpOpen && (
        <SharePopUp setIsOpen={setIsSharePopUpOpen} event={event} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isEventDeleteAlertOpen && (
        <EventDeleteAlert
          setIsEventDeleteAlertOpen={setIsEventDeleteAlertOpen}
        />
      )}
    </>
  );
}
