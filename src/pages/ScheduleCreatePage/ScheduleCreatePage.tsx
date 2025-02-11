import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import MemberLoginScreen from './MemberLoginScreen/MemberLoginScreen';
import ScheduleFormScreen from './ScheduleFormScreen/ScheduleFormScreen';
import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopHeaderForDesktop from './TopHeaderForDesktop/TopHeaderForDesktop';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import BackButtonAlert from '@/components/alert/BackButtonAlert/BackButtonAlert';
import { FooterContext } from '@/contexts/FooterContext';
import useGrayBackground from '@/hooks/useGrayBackground';
import useScheduleCreate from '@/hooks/useScheduleCreate';
import { GuestValueType } from '@/types/user.type';
import cn from '@/utils/cn';

export default function ScheduleCreatePage() {
  const [pageIndex, setPageIndex] = useState(
    localStorage.getItem('access-token') !== null ? 1 : 0,
  );
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestValue, setGuestValue] = useState<GuestValueType>({
    name: '',
    pin: '',
  });
  const [isPossibleTime, setIsPossibleTime] = useState(true);
  const [isTopSubmitButtonClicked, setIsTopSubmitButtonClicked] =
    useState(false);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setIsFooterVisible } = useContext(FooterContext);

  const { schedules, setSchedules, event } = useScheduleCreate({
    isNewGuest,
    guestId,
  });
  useGrayBackground();

  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  function handleBackButtonClick() {
    if (pageIndex === 0) {
      closePage();
    } else if (pageIndex === 1) {
      if (isLoggedIn) {
        closePage();
      } else {
        setPageIndex((prev) => prev - 1);
      }
    }

    function closePage() {
      if (isScheduleEdited) {
        setIsBackButtonAlertOpen(true);
      } else {
        navigate(`/events/${params.eventId}`);
      }
    }
  }

  useEffect(() => {
    setIsFooterVisible(false);
    return () => {
      setIsFooterVisible(true);
    };
  });

  return (
    <>
      <Helmet>
        <title>스케줄 등록 - OneTime</title>
      </Helmet>
      <>
        <TopNavBarForDesktop />
        <TopAppBarForMobile
          pageIndex={pageIndex}
          handleBackButtonClick={handleBackButtonClick}
          setIsTopSubmitButtonClicked={setIsTopSubmitButtonClicked}
        />
      </>
      <div className="md:px-4">
        <>
          <TopHeaderForDesktop handleBackButtonClick={handleBackButtonClick} />
        </>
        <main
          className={cn(
            'mx-auto flex flex-col bg-gray-00 px-6 md:h-auto md:max-w-screen-sm md:gap-14 md:rounded-3xl md:px-9',
            {
              'py-4 md:py-10': pageIndex === 0,
              'md:mb-28 md:py-6': pageIndex === 1,
            },
          )}
        >
          {pageIndex === 0 && (
            <MemberLoginScreen
              setPageIndex={setPageIndex}
              setGuestId={setGuestId}
              guestValue={guestValue}
              setGuestValue={setGuestValue}
              setIsNewGuest={setIsNewGuest}
            />
          )}
          {pageIndex === 1 && event && (
            <ScheduleFormScreen
              event={event}
              guestId={guestId}
              isNewGuest={isNewGuest}
              guestValue={guestValue}
              schedules={schedules}
              setSchedules={setSchedules}
              isPossibleTime={isPossibleTime}
              setIsPossibleTime={setIsPossibleTime}
              isTopSubmitButtonClicked={isTopSubmitButtonClicked}
              setIsTopSubmitButtonClicked={setIsTopSubmitButtonClicked}
              isScheduleEdited={isScheduleEdited}
              setIsScheduleEdited={setIsScheduleEdited}
            />
          )}
        </main>
      </div>
      {isBackButtonAlertOpen && isScheduleEdited && (
        <BackButtonAlert
          backHref={`/events/${params.eventId}`}
          setIsOpen={setIsBackButtonAlertOpen}
        />
      )}
    </>
  );
}
