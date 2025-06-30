'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import MemberLoginSubScreen from './member-login';
import ScheduleFormSubScreen from './schedule-form';
import BackButtonAlert from '@/components/alert/back-button-alert';
import SmallButton from '@/components/button/small-button';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import useGrayBackground from '@/hooks/useGrayBackground';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import { useAuth } from '@/lib/api/auth.client';
import {
  checkNewGuestApi,
  createNewMemberScheduleApi,
  loginGuestApi,
  updateScheduleApi,
} from '@/lib/api/mutations';
import { eventQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { breakpoint, defaultEvent } from '@/lib/constants';
import { GuestValueType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ScheduleAddScreen() {
  const { isLoggedIn } = useAuth();

  const [pageIndex, setPageIndex] = useState(isLoggedIn ? 1 : 0);
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestValue, setGuestValue] = useState<GuestValueType>({
    name: '',
    pin: '',
  });
  const [disabled, setDisabled] = useState(true);
  const [nicknameDisabled, setNicknameDisabled] = useState(true);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setFooterVisible } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
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
    guestId,
    eventId: params.id,
  });
  useGrayBackground({
    breakpointCondition: () => window.innerWidth >= breakpoint.sm,
  });

  const { data: event } = useQuery({
    ...eventQueryOptions(params.id),
  });

  const { mutateAsync: checkNewGuest } = useMutation({
    mutationFn: checkNewGuestApi,
  });
  const { mutateAsync: loginGuest } = useMutation({
    mutationFn: loginGuestApi,
  });
  const { mutateAsync: createNewMemberSchedule } = useMutation({
    mutationFn: createNewMemberScheduleApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      progressRouter.push(`/events/${params.id}`);
    },
  });
  const { mutateAsync: updateSchedule } = useMutation({
    mutationFn: updateScheduleApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      progressRouter.push(`/events/${params.id}`);
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if ((e.target as HTMLElement).getAttribute('id') !== 'schedule-add') return;

    if (pageIndex === 0) {
      if (disabled) return;

      const { is_possible: isNewGuestData } = await checkNewGuest({
        eventId: params.id,
        name: guestValue.name,
      });
      setIsNewGuest(isNewGuestData);
      if (isNewGuestData) {
        return setPageIndex(1);
      }

      const { guestId, pinNotCorrect } = await loginGuest({
        eventId: params.id,
        name: guestValue.name,
        pin: guestValue.pin,
      });
      if (pinNotCorrect) {
        return alert('PIN 번호가 올바르지 않습니다.');
      } else if (!guestId) {
        return alert('로그인 도중 에러가 발생했습니다.');
      }
      setGuestId(guestId);
      setPageIndex(1);
    } else if (isNewGuest) {
      await createNewMemberSchedule({
        eventId: params.id,
        name: guestValue.name,
        pin: guestValue.pin,
        schedule: scheduleValue[0].schedules,
      });
    } else {
      await updateSchedule({
        event: event || defaultEvent,
        guestId,
        schedule: scheduleValue[0].schedules,
      });
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

  useEffect(() => {
    setDisabled(
      guestValue.name === '' ||
        guestValue.pin.length !== 4 ||
        guestValue.pin.includes('-') ||
        nicknameDisabled,
    );
  }, [guestValue, nicknameDisabled]);

  return (
    <form
      id="schedule-add"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.preventDefault();
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
                <SmallButton>{t('done')}</SmallButton>
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
              guestValue={guestValue}
              setGuestValue={setGuestValue}
              setNicknameDisabled={setNicknameDisabled}
              disabled={disabled}
            />
          )}
          {pageIndex === 1 && event && (
            <ScheduleFormSubScreen
              scheduleValue={scheduleValue}
              setScheduleValue={setScheduleValue}
              event={event}
              isScheduleEdited={isScheduleEdited}
              setIsScheduleEdited={setIsScheduleEdited}
              isNewGuest={isNewGuest}
              initialSchedule={initialSchedule}
              isScheduleEmpty={isScheduleEmpty}
              isFixedScheduleEmpty={isFixedScheduleEmpty}
              isSleepTimeEmpty={isSleepTimeEmpty}
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
