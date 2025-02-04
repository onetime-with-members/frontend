import dayjs, { weekdaysMin } from 'dayjs';
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
import useGrayBackground from '@/hooks/useGrayBackground';
import { EventType } from '@/types/event.type';
import { MyScheduleTime, Schedule } from '@/types/schedule.type';
import { GuestValue } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { getBlockTimeList } from '@/utils/time-block';
import { useQuery } from '@tanstack/react-query';

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

  useGrayBackground();

  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const { data: event } = useQuery<EventType>({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data.payload;
    },
  });

  const { data: scheduleData } = useQuery<Schedule>({
    queryKey: [
      'schedules',
      event?.category?.toLowerCase(),
      params.eventId,
      isLoggedIn ? 'user' : guestId,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category?.toLowerCase()}/${params.eventId}/${isLoggedIn ? 'user' : guestId}`,
      );
      return res.data.payload;
    },
    enabled: event && !isNewGuest,
  });

  const { data: fixedScheduleData } = useQuery<MyScheduleTime[]>({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data.payload.schedules;
    },
    enabled: isLoggedIn,
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
    if (!scheduleData || !fixedScheduleData) return;
    const isScheduleEmpty =
      scheduleData.schedules.length === 0 ||
      scheduleData.schedules.every((schedule) => schedule.times.length === 0);
    const isFixedScheduleEmpty = fixedScheduleData.every(
      (fixedSchedule) => fixedSchedule.times.length === 0,
    );
    if (isScheduleEmpty) {
      setSchedules([
        {
          name: scheduleData.name,
          schedules: isFixedScheduleEmpty ? [] : initSchedule() || [],
        },
      ]);
    } else {
      setSchedules([scheduleData]);
    }

    function initSchedule() {
      if (!event) return;
      return (
        event.ranges.map((time_point) => ({
          time_point,
          times: convertedTimeBlockList(
            event.start_time,
            event.end_time,
            fixedSchedule(time_point, event.category),
          ),
        })) || []
      );

      function weekdayIndex(
        timePoint: string,
        category: 'DATE' | 'DAY' = 'DAY',
      ) {
        return dayjs
          .weekdaysMin()
          .findIndex(
            (w) =>
              w ===
              (category === 'DATE'
                ? dayjs(timePoint).format('ddd')
                : timePoint),
          );
      }

      function fixedSchedule(timePoint: string, category: 'DATE' | 'DAY') {
        return (
          fixedScheduleData?.find(
            (fixedSchedule) =>
              weekdayIndex(timePoint, category) ===
              weekdayIndex(fixedSchedule.time_point, 'DAY'),
          )?.times || []
        );
      }

      function convertedTimeBlockList(
        startTime: string,
        endTime: string,
        fixedScheduleTimes: string[],
      ) {
        return getBlockTimeList(startTime, endTime).filter(
          (time) => !fixedScheduleTimes.includes(time),
        );
      }
    }
  }, [scheduleData, fixedScheduleData, weekdaysMin]);

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
