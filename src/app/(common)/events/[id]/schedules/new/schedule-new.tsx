'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import MemberLoginSubScreen from './member-login';
import ScheduleFormSubScreen from './schedule-form';
import BackButtonAlert from '@/components/alert/back-button-alert';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import { eventQueryOptions } from '@/features/events/api/events.option';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import cn from '@/lib/cn';
import { GuestValueType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ScheduleAddScreen({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [pageIndex, setPageIndex] = useState(isLoggedIn ? 1 : 0);
  const [guestValue, setGuestValue] = useState<GuestValueType>({
    isNewGuest: false,
    guestId: '',
    name: '',
    pin: '',
  });
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setFooterVisible } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('scheduleAdd');

  const {
    scheduleValue,
    setScheduleValue,
    initialSchedule,
    isScheduleEmpty,
    isFixedScheduleEmpty,
    isSleepTimeEmpty,
  } = useScheduleAdd({
    isLoggedIn,
    guestId: guestValue.guestId,
    eventId: params.id,
  });

  const { data: event } = useQuery({
    ...eventQueryOptions(params.id),
  });

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
        progressRouter.back();
      }
    }
  }

  useEffect(() => {
    setPageIndex(isLoggedIn ? 1 : 0);
  }, [isLoggedIn]);

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  });

  return (
    <>
      {/* Gray Background */}
      <GrayBackground device="desktop" breakpoint="sm" />

      {/* Navigation Bar for Desktop */}
      <NavBar className="hidden sm:flex" shadow={false} />
      {/* App Bar for Mobile */}
      <header className="block h-[69px] sm:hidden">
        <div className="fixed left-0 top-0 z-50 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button type="button" onClick={handleBackButtonClick}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
              {t('enterSchedule')}
            </h2>
            <div id="schedule-submit-button" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="sm:px-4">
        {/* Header for Desktop */}
        <header className="mx-auto hidden max-w-[480px] items-center py-8 sm:flex">
          <button type="button" onClick={handleBackButtonClick}>
            <IconChevronLeft size={32} />
          </button>
          <h1 className="text-gray-90 title-lg-300">{t('enterSchedule')}</h1>
        </header>

        {/* Screen Content */}
        <main
          className={cn(
            'mx-auto flex flex-col bg-gray-00 px-6 sm:h-auto sm:max-w-[480px] sm:gap-14 sm:rounded-3xl sm:px-9',
            {
              'py-4 sm:py-10': pageIndex === 0,
              'pb-16 sm:mb-28 sm:py-6': pageIndex === 1,
            },
          )}
        >
          {pageIndex === 0 && (
            <MemberLoginSubScreen
              setPageIndex={setPageIndex}
              setGuestValue={setGuestValue}
            />
          )}
          {pageIndex === 1 && event && (
            <ScheduleFormSubScreen
              scheduleValue={scheduleValue}
              setScheduleValue={setScheduleValue}
              isScheduleEdited={isScheduleEdited}
              setIsScheduleEdited={setIsScheduleEdited}
              initialSchedule={initialSchedule}
              emptyStatus={{
                isFixedScheduleEmpty,
                isScheduleEmpty,
                isSleepTimeEmpty,
              }}
              guestValue={guestValue}
            />
          )}
        </main>
      </div>

      {/* Alert for Back Button */}
      {isBackButtonAlertOpen && isScheduleEdited && (
        <BackButtonAlert
          backHref={`/events/${params.id}`}
          setIsOpen={setIsBackButtonAlertOpen}
        />
      )}
    </>
  );
}
