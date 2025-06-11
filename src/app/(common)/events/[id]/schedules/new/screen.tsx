'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import MemberLoginSubScreen from './member-login-sub-screen';
import ScheduleFormSubScreen from './schedule-form-sub-screen';
import BackButtonAlert from '@/components/alert/back-button-alert';
import SmallButton from '@/components/button/small-button';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import useGrayBackground from '@/hooks/useGrayBackground';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import { createNewMemberSchedule, updateSchedule } from '@/lib/actions';
import cn from '@/lib/cn';
import { breakpoint } from '@/lib/constants';
import { GuestValueType } from '@/lib/types';
import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function ScheduleAddScreen({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [pageIndex, setPageIndex] = useState(isLoggedIn ? 1 : 0);
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestValue, setGuestValue] = useState<GuestValueType>({
    name: '',
    pin: '',
  });
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setFooterVisible } = useContext(FooterContext);

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const t = useTranslations('scheduleAdd');

  const { schedules, setSchedules, event, initialSchedule } = useScheduleAdd({
    isNewGuest,
    guestId,
  });
  useGrayBackground({
    breakpointCondition: () => window.innerWidth >= breakpoint.sm,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pageIndex !== 1) return;

    if (isNewGuest) {
      const formData = new FormData();
      formData.set('event_id', params.id);
      formData.set('name', guestValue.name);
      formData.set('pin', guestValue.pin);
      formData.set('schedules', JSON.stringify(schedules));
      await createNewMemberSchedule(formData);
    } else {
      const formData = new FormData();
      formData.set('event', JSON.stringify(event));
      formData.set('guestId', guestId);
      formData.set('schedule', JSON.stringify(schedules[0].schedules));
      await updateSchedule(formData);
    }
  }

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
        router.back();
      }
    }
  }

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  });

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
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
            {pageIndex === 1 && (
              <div className="flex items-center justify-end">
                <TopSubmitButton />
              </div>
            )}
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
              setGuestId={setGuestId}
              guestValue={guestValue}
              setGuestValue={setGuestValue}
              setIsNewGuest={setIsNewGuest}
            />
          )}
          {pageIndex === 1 && event && (
            <ScheduleFormSubScreen
              event={event}
              schedules={schedules}
              setSchedules={setSchedules}
              isScheduleEdited={isScheduleEdited}
              setIsScheduleEdited={setIsScheduleEdited}
              isNewGuest={isNewGuest}
              guestId={guestId}
              initialSchedule={initialSchedule}
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
    </form>
  );
}

export function TopSubmitButton() {
  const { pending } = useFormStatus();

  const t = useTranslations('scheduleAdd');

  return (
    <SmallButton disabled={pending}>
      {pending ? t('doing') : t('done')}
    </SmallButton>
  );
}
