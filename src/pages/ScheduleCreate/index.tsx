import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import MemberLoginScreen from './MemberLoginScreen';
import ScheduleFormScreen from './ScheduleFormScreen';
import TopAppBarForMobile from './TopAppBarForMobile';
import TopHeaderForDesktop from './TopHeaderForDesktop';
import TopNavBarForDesktop from './TopNavBarForDesktop';
import BackButtonAlert from '@/components/alert/BackButtonAlert';
import { FooterContext } from '@/contexts/FooterContext';
import { GuestValue } from '@/types/guest.type';
import { Schedule } from '@/types/schedule.type';
import breakpoint from '@/utils/breakpoint';
import cn from '@/utils/cn';

export default function ScheduleCreate() {
  const [pageIndex, setPageIndex] = useState(
    localStorage.getItem('access-token') !== null ? 1 : 0,
  );
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestValue, setGuestValue] = useState<GuestValue>({
    name: '',
    pin: '',
  });
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);
  const [isPossibleTime, setIsPossibleTime] = useState(true);
  const [isTopSubmitButtonClicked, setIsTopSubmitButtonClicked] =
    useState(false);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setIsFooterVisible } = useContext(FooterContext);

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

  useEffect(() => {
    function updateBackgroundColor() {
      if (window.innerWidth >= breakpoint.md) {
        document.body.style.backgroundColor = '#F9F9F9';
      } else {
        document.body.style.backgroundColor = '';
      }
    }

    function initBackgroundColor() {
      document.body.style.backgroundColor = '';
    }

    updateBackgroundColor();

    window.addEventListener('resize', updateBackgroundColor);

    return () => {
      initBackgroundColor();

      window.removeEventListener('resize', updateBackgroundColor);
    };
  }, []);

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
            'mx-auto flex flex-col bg-gray-00 px-6 py-4 md:h-auto md:max-w-screen-sm md:gap-14 md:rounded-3xl md:px-9 md:py-10',
            {
              'md:mb-28': pageIndex === 1,
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
          {pageIndex === 1 && (
            <ScheduleFormScreen
              guestId={guestId}
              isNewGuest={isNewGuest}
              guestValue={guestValue}
              isLoggedIn={isLoggedIn}
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
