import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { FooterContext } from '../../contexts/FooterContext';
import { GuestValue } from '../../types/guest.type';
import breakpoint from '../../utils/breakpoint';
import BackButtonAlert from './components/BackButtonAlert';
import TopAppBarForMobile from './components/TopAppBarForMobile';
import TopHeaderForDesktop from './components/TopHeaderForDesktop';
import TopNavBarForDesktop from './components/TopNavBarForDesktop';
import MemberLoginScreen from './components/screen/MemberLoginScreen';
import ScheduleFormScreen from './components/screen/ScheduleFormScreen';

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
  const [isTopSubmitButtonClicked, setIsTopSubmitButtonClicked] =
    useState(false);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);

  const { setIsFooterVisible } = useContext(FooterContext);

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  function handleBackButtonClick() {
    if (pageIndex === 0) {
      setIsBackButtonAlertOpen(true);
    } else if (pageIndex === 1) {
      if (isLoggedIn) {
        setIsBackButtonAlertOpen(true);
      } else {
        setPageIndex((prev) => prev - 1);
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
          className={clsx(
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
              isTopSubmitButtonClicked={isTopSubmitButtonClicked}
              setIsTopSubmitButtonClicked={setIsTopSubmitButtonClicked}
            />
          )}
        </main>
      </div>
      {isBackButtonAlertOpen && (
        <BackButtonAlert setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
