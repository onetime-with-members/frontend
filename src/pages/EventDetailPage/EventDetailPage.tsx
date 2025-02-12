import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import EventDeleteAlert from './EventDeleteAlert/EventDeleteAlert';
import LoginAlert from './LoginAlert/LoginAlert';
import MainContent from './MainContent/MainContent';
import SharePopUp from './SharePopUp/SharePopUp';
import TopNavBar from './TopNavBar/TopNavBar';
import TopToolbar from './TopToolbar/TopToolbar';
import { AppDispatch, RootState } from '@/store';
import { getEvent } from '@/store/eventSlice';

export default function EventDetailPage() {
  const { event, isNotFound } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();

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
    if (params.eventId) {
      dispatch(getEvent(params.eventId));
    }
  }, [params.eventId]);

  useEffect(() => {
    if (isNotFound) {
      navigate('/not-found');
    }
  }, [isNotFound]);

  return (
    <>
      <Helmet>
        <title>{event.title} | OneTime</title>
      </Helmet>
      <div className="flex flex-col">
        <TopNavBar />
        <TopToolbar
          setIsDeleteAlertOpen={setIsDeleteAlertOpen}
          handleShareButtonClick={handleShareButtonClick}
        />
        <MainContent />
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
        <SharePopUp setIsOpen={setIsSharePopUpOpen} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isDeleteAlertOpen && (
        <EventDeleteAlert setIsEventDeleteAlertOpen={setIsDeleteAlertOpen} />
      )}
    </>
  );
}
