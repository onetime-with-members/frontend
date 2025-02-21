import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import {
  useScheduleAndNewMemberCreate,
  useScheduleQuery,
  useScheduleUpdateMutation,
} from '@/queries/schedule.queries';
import { GuestValueType } from '@/types/user.type';
import breakpoint from '@/utils/breakpoint';
import cn from '@/utils/cn';
import { useQueryClient } from '@tanstack/react-query';

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
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);
  const [isScheduleEdited, setIsScheduleEdited] = useState(false);

  const { setIsFooterVisible } = useContext(FooterContext);

  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { schedules, setSchedules, event } = useScheduleCreate({
    isNewGuest,
    guestId,
  });
  useGrayBackground({
    breakpointCondition: () => window.innerWidth >= breakpoint.sm,
  });

  const { refetch: refetchScheduleQuery } = useScheduleQuery(event);

  const {
    mutate: createNewMemberSchedule,
    isPending: isCreateNewMemberSchedulePending,
  } = useScheduleAndNewMemberCreate({
    event,
    guestValue,
    schedules: schedules[0].schedules,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      await refetchScheduleQuery();
      navigate(`/events/${event?.event_id}`);
    },
  });
  const { mutate: updateSchedule, isPending: isUpdateSchedulePending } =
    useScheduleUpdateMutation({
      event,
      guestId,
      schedules: schedules[0].schedules,
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['events'] });
        await queryClient.invalidateQueries({ queryKey: ['schedules'] });
        await refetchScheduleQuery();
        navigate(`/events/${event?.event_id}`);
      },
    });

  const isLoggedIn = localStorage.getItem('access-token') !== null;
  const isSubmitting =
    isCreateNewMemberSchedulePending || isUpdateSchedulePending;

  function handleSubmit() {
    if (pageIndex !== 1) return;
    if (isNewGuest) {
      createNewMemberSchedule();
    } else {
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
        <title>{t('scheduleAdd.addSchedule')} | OneTime</title>
      </Helmet>

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
              'sm:mb-28 sm:py-6': pageIndex === 1,
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
