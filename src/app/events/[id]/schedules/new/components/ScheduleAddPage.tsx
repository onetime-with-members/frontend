'use client';

import { getCookie } from 'cookies-next';
import { useContext, useEffect, useState } from 'react';

import MemberLoginScreen from './MemberLoginScreen/MemberLoginScreen';
import ScheduleFormScreen from './ScheduleFormScreen/ScheduleFormScreen';
import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopHeaderForDesktop from './TopHeaderForDesktop/TopHeaderForDesktop';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import BackButtonAlert from '@/components/alert/BackButtonAlert/BackButtonAlert';
import { FooterContext } from '@/contexts/FooterContext';
import useGrayBackground from '@/hooks/useGrayBackground';
import useScheduleAdd from '@/hooks/useScheduleAdd';
import {
  useScheduleAndNewMemberCreate,
  useScheduleQuery,
  useScheduleUpdateMutation,
} from '@/queries/schedule.queries';
import { GuestValueType } from '@/types/user.type';
import breakpoint from '@/utils/breakpoint';
import cn from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function ScheduleAddPage() {
  const [pageIndex, setPageIndex] = useState(
    !!getCookie('access-token') ? 1 : 0,
  );
  const [isNewGuest, setIsNewGuest] = useState(false);
  const [guestId, setGuestId] = useState('');
  const [guestValue, setGuestValue] = useState<GuestValueType>({
    name: '',
    pin: '',
  });
  const [isPossibleTime, setIsPossibleTime] = useState(true);
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);
  const [
    isCreateNewMemberScheduleMutating,
    setIsCreateNewMemberScheduleMutating,
  ] = useState(false);
  const [isUpdateScheduleMutating, setIsUpdateScheduleMutating] =
    useState(false);

  const { setFooterVisible } = useContext(FooterContext);

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { schedules, setSchedules, event, initialSchedule } = useScheduleAdd({
    isNewGuest,
    guestId,
  });
  useGrayBackground({
    breakpointCondition: () => window.innerWidth >= breakpoint.sm,
  });

  const { refetch: refetchScheduleQuery } = useScheduleQuery(event);

  const { mutate: createNewMemberSchedule } = useScheduleAndNewMemberCreate({
    event,
    guestValue,
    schedules: schedules[0].schedules,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      await refetchScheduleQuery();
      router.push(`/events/${event?.event_id}`);
    },
    onError: () => {
      setIsCreateNewMemberScheduleMutating(false);
    },
  });
  const { mutate: updateSchedule } = useScheduleUpdateMutation({
    event,
    guestId,
    schedules: schedules[0].schedules,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      await refetchScheduleQuery();
      router.push(`/events/${event?.event_id}`);
    },
    onError: () => {
      setIsUpdateScheduleMutating(false);
    },
  });

  const isLoggedIn = !!getCookie('access-token');
  const isSubmitting =
    isCreateNewMemberScheduleMutating || isUpdateScheduleMutating;

  function handleSubmit() {
    if (pageIndex !== 1) return;
    if (isNewGuest) {
      setIsCreateNewMemberScheduleMutating(true);
      createNewMemberSchedule();
    } else {
      setIsUpdateScheduleMutating(true);
      updateSchedule();
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
        router.push(`/events/${params.id}`);
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
    <>
      <TopNavBarForDesktop />
      <TopAppBarForMobile
        pageIndex={pageIndex}
        onBackButtonClick={handleBackButtonClick}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <div className="sm:px-4">
        <TopHeaderForDesktop handleBackButtonClick={handleBackButtonClick} />

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
              schedules={schedules}
              setSchedules={setSchedules}
              isPossibleTime={isPossibleTime}
              setIsPossibleTime={setIsPossibleTime}
              isScheduleEdited={isScheduleEdited}
              setIsScheduleEdited={setIsScheduleEdited}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isNewGuest={isNewGuest}
              guestId={guestId}
              initialSchedule={initialSchedule}
            />
          )}
        </main>
      </div>

      {isBackButtonAlertOpen && isScheduleEdited && (
        <BackButtonAlert
          backHref={`/events/${params.id}`}
          setIsOpen={setIsBackButtonAlertOpen}
        />
      )}
    </>
  );
}
