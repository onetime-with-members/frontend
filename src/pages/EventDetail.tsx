import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../api/axios';
import NavBar from '../components/NavBar';
import EventDeleteAlert from '../components/alert/EventDeleteAlert';
import LoginAlert from '../components/alert/LoginAlert';
import TopBannerList from '../components/banner/banner-list/TopBannerList';
import EmptyEventBanner from '../components/banner/empty-event/EmptyEventBanner';
import Button from '../components/button/Button';
import BadgeFloatingBottomButton from '../components/floating-button/BadgeFloatingBottomButton';
import SharePopUp from '../components/pop-up/SharePopUp';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';
import { FooterContext } from '../contexts/FooterContext';
import { EventType } from '../types/event.type';
import { RecommendSchedule, Schedule } from '../types/schedule.type';
import { sortWeekdayList } from '../utils/weekday';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EventDetail() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isEventDeleteAlertOpen, setIsEventDeleteAlertOpen] = useState(false);

  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isEventPending, data: eventData } = useQuery({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  let event: EventType = eventData?.payload;
  if (event) {
    if (event?.category === 'DAY') {
      event.ranges = sortWeekdayList(event.ranges);
    } else {
      event.ranges = event.ranges.sort();
    }
  }

  const { isPending: isSchedulePending, data: scheduleData } = useQuery({
    queryKey: ['schedules', event?.category.toLowerCase(), params.eventId],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}`,
      );
      return res.data;
    },
    enabled: !!event,
  });

  const schedules: Schedule[] = scheduleData?.payload;

  const { isPending: isRecommendPending, data: recommendData } = useQuery({
    queryKey: ['events', params.eventId, 'most'],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}/most`);
      return res.data;
    },
  });

  const recommendSchedules: RecommendSchedule[] = recommendData?.payload;

  const participants: string[] = schedules
    ?.map((schedule) => schedule.name)
    .sort();

  const deleteEvent = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/events/${params.eventId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/');
    },
  });

  function copyEventShareLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${params.eventId}`,
    );
  }

  function handleShareButtonClick() {
    setIsSharePopUpOpen(true);
  }

  function handleFloatingButtonClick() {
    if (localStorage.getItem('access-token')) {
      window.location.href = `/events/${params.eventId}/schedules/new`;
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  function handleEventDeleteALertOpen() {
    setIsEventDeleteAlertOpen(true);
  }

  function handleEventDeleteALertClose() {
    setIsEventDeleteAlertOpen(false);
  }

  function handleEventDelete() {
    deleteEvent.mutate();
  }

  const [isFooterShown, setIsFooterShown] = useState(false);

  const { footerRef } = useContext(FooterContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (footerRef && footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef && footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [footerRef]);

  if (
    isEventPending ||
    isSchedulePending ||
    isRecommendPending ||
    event === undefined ||
    schedules === undefined ||
    recommendSchedules === undefined
  )
    return <></>;

  return (
    <>
      <Helmet>
        <title>{event.title} - OneTime</title>
      </Helmet>
      <div className="flex flex-col gap-2 bg-gray-05">
        <div>
          <NavBar />
          <div className="rounded-t-3xl bg-primary-40 px-6 py-4">
            <header className="mx-auto max-w-screen-sm">
              <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 title-sm-300">
                {event.title}
              </h1>
            </header>
          </div>
        </div>
        <div className="mx-auto mt-4 w-full max-w-screen-sm px-4">
          <main className="pb-16">
            <div className="flex flex-col gap-10">
              <TimeBlockBoard
                event={event}
                schedules={schedules}
                backgroundColor="white"
                topAction={true}
                topActionOnClick={{
                  share: handleShareButtonClick,
                  delete: handleEventDeleteALertOpen,
                }}
                isCreator={event.event_status === 'CREATOR'}
              />
              {schedules.length === 0 ? (
                <EmptyEventBanner copyEventShareLink={copyEventShareLink} />
              ) : (
                <TopBannerList
                  eventCategory={event.category}
                  recommendSchedules={recommendSchedules}
                  participants={participants}
                />
              )}
            </div>
          </main>
        </div>
        <>
          <div
            className={clsx(
              'fixed bottom-0 flex w-full items-center justify-center bg-gray-00 p-4 duration-150 md:hidden',
              {
                'pointer-events-none opacity-0': isFooterShown,
              },
            )}
          >
            <Button className="w-full max-w-screen-sm">
              <span className="flex items-center justify-center gap-1">
                <span>스케줄 추가</span>
                <span>
                  <IconPlus size={24} />
                </span>
              </span>
            </Button>
          </div>
          <BadgeFloatingBottomButton
            name="스케줄 추가"
            onClick={handleFloatingButtonClick}
            className={clsx('hidden duration-150 md:block', {
              'pointer-events-none opacity-0': isFooterShown,
            })}
          />
        </>
      </div>
      {isSharePopUpOpen && (
        <SharePopUp setIsOpen={setIsSharePopUpOpen} event={event} />
      )}
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isEventDeleteAlertOpen && (
        <EventDeleteAlert
          onConfirm={handleEventDelete}
          onCancel={handleEventDeleteALertClose}
          onClose={handleEventDeleteALertClose}
          isDeleteLoading={deleteEvent.isPending}
        />
      )}
    </>
  );
}
