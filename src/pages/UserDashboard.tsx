import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import EmptyUI from '../components/EmptyUI';
import MyScheduleList from '../components/MyScheduleList';
import MyTimeBlockBoard from '../components/MyTimeBlockBoard';
import NavBar from '../components/NavBar';
import Button from '../components/button/Button';
import MyEventItem from '../components/list/my-event/MyEventItem';
import { FooterContext } from '../contexts/FooterContext';
import { MyScheduleContext } from '../contexts/MyScheduleContext';
import { MyEvent } from '../types/event.type';
import { User } from '../types/user.type';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

interface UserDashboardProps {
  user: User;
}

export default function UserDashboard({ user }: UserDashboardProps) {
  const {
    setViewMode,
    selectedTimeBlockId,
    setSelectedTimeBlockId,
    setIsSelectDisabled,
  } = useContext(MyScheduleContext);
  const { isFooterShown } = useContext(FooterContext);

  const navigate = useNavigate();

  const { isPending: isEventsPending, data: eventsData } = useQuery({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data;
    },
  });

  const events: MyEvent[] = eventsData?.payload;

  const { data: mySchedulesData, isLoading: isMySchedulesLoading } = useQuery({
    queryKey: ['fixed-schedules'],
    queryFn: async () => {
      const res = await axios.get('/fixed-schedules');
      return res.data;
    },
  });

  const mySchedules = mySchedulesData?.payload;

  function handleFloatingBottomButtonClick() {
    navigate('/events/new');
  }

  useEffect(() => {
    setIsSelectDisabled(true);

    return () => {
      setIsSelectDisabled(false);
    };
  }, []);

  useEffect(() => {
    setViewMode('timeblock');
    setSelectedTimeBlockId(null);
  }, [setViewMode]);

  if (
    isEventsPending ||
    isMySchedulesLoading ||
    events === undefined ||
    mySchedules === undefined
  ) {
    return <></>;
  }

  return (
    <div className="flex flex-col pb-20">
      <NavBar overlay={selectedTimeBlockId !== null} />
      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        <div className="rounded-t-3xl bg-primary-40 px-6 py-4 text-gray-00">
          <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-2">
            <h1 className="flex-1 title-lg-300">
              안녕하세요, {user.nickname}님
            </h1>
            <Link
              to="/events/new"
              className="hidden rounded-xl bg-primary-60 px-4 py-2 text-gray-00 lg:flex"
            >
              이벤트 생성하기
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-14 bg-gray-05 px-6 pt-6">
          <section className="flex flex-col gap-3">
            <header className="flex items-center justify-between">
              <h2 className="text-gray-90 title-sm-300">참여한 이벤트</h2>
              <Link
                to="/mypage/events"
                className="flex items-center text-gray-50"
              >
                <span>더 보기</span>
                <span>
                  <IconChevronRight />
                </span>
              </Link>
            </header>
            <ul className="grid grid-cols-1 lg:hidden">
              {events.length === 0 ? (
                <div className="rounded-2xl bg-gray-00 py-5">
                  <EmptyUI>아직 참여한 이벤트가 없어요.</EmptyUI>
                </div>
              ) : (
                events
                  .slice(0, 1)
                  .map((event) => (
                    <MyEventItem
                      key={event.event_id}
                      event={event}
                      className="border-none"
                    />
                  ))
              )}
            </ul>
            <ul className="hidden grid-cols-2 gap-4 lg:grid">
              {events.slice(0, 2).map((event) => (
                <MyEventItem
                  key={event.event_id}
                  event={event}
                  className="border-none"
                />
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-3">
            <header className="flex items-center justify-between gap-3">
              <h2 className="text-gray-90 title-sm-300">고정 스케줄</h2>
              <Link
                to="/mypage/schedules"
                className="flex items-center text-gray-50"
              >
                <span>더 보기</span>
                <span>
                  <IconChevronRight />
                </span>
              </Link>
            </header>
            <div className="flex items-start gap-6">
              <MyTimeBlockBoard
                mode="view"
                mySchedules={mySchedules}
                backgroundColor="white"
                className="hidden flex-1 md:block"
              />
              <div className="mt-8 flex-1 rounded-2xl bg-gray-00 px-5 py-4">
                <MyScheduleList hasWeekdaySelcectUI={false} />
              </div>
            </div>
          </section>
        </div>
        <div
          className={clsx(
            'fixed bottom-0 left-0 w-full bg-gray-00 p-4 shadow-[0px_-4px_32px_0px_rgba(0,0,0,0.05)] transition-opacity duration-150 lg:hidden',
            {
              'pointer-events-none opacity-0': isFooterShown,
              'opacity-100': !isFooterShown,
            },
          )}
        >
          <div className="mx-auto w-full max-w-screen-md">
            <Button onClick={handleFloatingBottomButtonClick}>
              <span className="flex items-center justify-center gap-1">
                <span>이벤트 생성하기</span>
                <span>
                  <IconPlus size={24} />
                </span>
              </span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
