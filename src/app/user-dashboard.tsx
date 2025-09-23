'use client';

import { useTranslations } from 'next-intl';
import { Suspense, useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import BarBanner from '@/components/bar-banner';
import Button from '@/components/button';
import EmptyUI from '@/components/empty-ui';
import MyEvent from '@/components/event/my-event';
import EverytimeUI from '@/components/everytime-ui';
import PenIcon from '@/components/icon/PenIcon';
import SleepIcon from '@/components/icon/SleepTimeIcon';
import NavBar from '@/components/nav-bar';
import TimeBlockBoardSkeleton from '@/components/skeleton/time-block-board-skeleton';
import ToolbarTitleSkeleton from '@/components/skeleton/toolbar-title-skeleton';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { BarBannerContext } from '@/contexts/bar-banner';
import { FooterContext } from '@/contexts/footer';
import {
  myEventsQueryOptions,
  myScheduleQueryOptions,
  sleepTimeQueryOptions,
  userQueryOptions,
} from '@/lib/api/query-options';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  defaultMyEvent,
  defaultMySchedule,
} from '@/lib/constants';
import { MyScheduleTimeType } from '@/lib/types';
import { ProgressLink, useProgressRouter } from '@/navigation';
import { IconChevronRight, IconPlus } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function UserDashboardPage() {
  const { data: user } = useQuery({ ...userQueryOptions });

  const t = useTranslations('userDashboard');

  return (
    <div className="flex flex-col">
      <NavBar variant="default" className="hidden md:flex" shadow={false} />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />

      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        {/* Top Toolbar */}
        <header className="hidden h-[72px] w-full justify-center md:flex">
          <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] rounded-t-3xl bg-gray-00 duration-150">
            <div className="flex h-[72px] items-center rounded-t-3xl bg-gray-80 px-6 text-gray-00">
              <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-2">
                <h1 className="flex-1 title-lg-300">
                  {user ? (
                    t('hello', { name: user.nickname })
                  ) : (
                    <ToolbarTitleSkeleton />
                  )}
                </h1>
                <ProgressLink
                  href="/events/new"
                  className="hidden rounded-xl bg-primary-50 px-4 py-2 text-gray-00 duration-150 text-md-200 hover:bg-primary-60 active:bg-primary-60 md:flex"
                >
                  {t('createEvent')}
                </ProgressLink>
              </div>
            </div>
          </div>
        </header>

        {/* Bar Banner */}
        <BarBanner
          className="h-[56px]"
          innnerClassName="fixed max-w-[calc(768px+2rem)] w-full z-30"
        />

        {/* Main Content */}
        <div className="flex flex-col gap-14 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          {/* Recent Events */}
          <section className="flex flex-col gap-3">
            {/* Header */}
            <MyEventsHeader />
            {/* My Events */}
            <MyEventsContent />
          </section>
          <section className="flex flex-col gap-3">
            <Header hasMore={false} description={t('myScheduleDescription')}>
              {t('mySchedule')}
            </Header>
            {/* My Schedule */}
            <Suspense fallback={<MyScheduleSkeleton />}>
              <MyScheduleContent />
            </Suspense>
          </section>
        </div>

        {/* Bottom Button For Mobile */}
        <BottomButtonForMobile />
      </main>
    </div>
  );
}

function MyEventsHeader() {
  const { data: myEvents } = useQuery({ ...myEventsQueryOptions });

  const t = useTranslations('userDashboard');

  return (
    <Header moreHref="/mypage/events">
      <span
        className={cn('block md:hidden', {
          'md:block': myEvents?.length === 1,
        })}
      >
        {t('recentEvent')}
      </span>
      <span
        className={cn('hidden md:block', {
          'md:hidden': myEvents?.length === 1,
        })}
      >
        {t('recentEvents')}
      </span>
    </Header>
  );
}

function MyEventsContent() {
  const { data: myEvents, isPending: isMyEventsPending } = useQuery({
    ...myEventsQueryOptions,
  });

  const t = useTranslations('userDashboard');

  if (isMyEventsPending) {
    return <MyEventsSkeleton />;
  }

  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
        'md:grid-cols-1': myEvents && myEvents.length <= 1,
      })}
    >
      {myEvents?.length === 0 ? (
        <div className="rounded-2xl bg-gray-00 py-5">
          <EmptyUI>{t('noEvent')}</EmptyUI>
        </div>
      ) : (
        myEvents?.slice(0, 2).map((myEvent, index) => (
          <MyEvent
            key={myEvent.event_id}
            event={myEvent}
            className={cn('border-none', {
              'hidden md:flex': index === 1,
            })}
          />
        ))
      )}
    </div>
  );
}

function MyEventsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <MyEvent
          key={index}
          event={defaultMyEvent}
          className={cn('border-none', { 'hidden md:block': index === 1 })}
          isPending={true}
        />
      ))}
    </div>
  );
}

function MyScheduleContent() {
  const { data: mySchedule, isPending: isMySchedulePending } = useQuery({
    ...myScheduleQueryOptions,
  });
  const { data: sleepTime, isPending: isSleepTimePending } = useQuery({
    ...sleepTimeQueryOptions,
  });

  if (isMySchedulePending || isSleepTimePending) {
    return <MyScheduleSkeleton />;
  }

  return (
    <div className="rounded-2xl bg-gray-00 pb-12">
      {/* Everytime UI */}
      <EverytimeUI className="rounded-t-2xl px-6" />

      {/* Sleep Time UI */}
      <div className="flex items-stretch justify-between gap-3 px-6 py-3">
        <div className="flex items-center gap-1.5 text-gray-80">
          <span className="text-xl">
            <SleepIcon />
          </span>
          <span className="text-lg-200">
            {sleepTime?.sleep_start_time} - {sleepTime?.sleep_end_time}
          </span>
        </div>
        <ProgressLink
          href="/mypage/schedule/edit"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-05 text-2xl text-gray-70 duration-150 hover:bg-gray-10 active:bg-gray-10"
        >
          <PenIcon />
        </ProgressLink>
      </div>

      {/* Time Block Board */}
      <MyTimeBlockBoardContent mySchedule={mySchedule || defaultMySchedule} />
    </div>
  );
}

function MyScheduleSkeleton() {
  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="rounded-2xl"
        style={{
          backgroundColor: SKELETON_GRAY,
        }}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={200} height={24} />
          <Skeleton width={24} height={24} circle />
        </div>

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <Skeleton width={150} height={32} />
          <Skeleton width={32} height={32} circle />
        </div>

        <TimeBlockBoardSkeleton
          baseColor={SKELETON_DARK_GRAY}
          className="pb-10 pl-4 pr-5 pt-4"
        />
      </div>
    </SkeletonTheme>
  );
}

function Header({
  children,
  moreHref = '#',
  hasMore = true,
  description,
  isPending = false,
}: {
  children: React.ReactNode;
  moreHref?: string;
  hasMore?: boolean;
  description?: string;
  isPending?: boolean;
}) {
  const t = useTranslations('userDashboard');

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-gray-90 title-sm-300">
            {!isPending ? children : <Skeleton width={200} height={30} />}
          </h2>
          {hasMore && (
            <ProgressLink
              href={moreHref}
              className="flex items-center text-gray-50"
            >
              {isPending ? (
                <Skeleton width={50} height={24} />
              ) : (
                <>
                  <span>{t('more')}</span>
                  <span>
                    <IconChevronRight />
                  </span>
                </>
              )}
            </ProgressLink>
          )}
        </div>
        {description && (
          <p className="text-gray-40 text-sm-200">
            {!isPending ? description : <Skeleton width={300} />}
          </p>
        )}
      </header>
    </SkeletonTheme>
  );
}

function MyTimeBlockBoardContent({
  mySchedule,
}: {
  mySchedule: MyScheduleTimeType[];
}) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <MyTimeBlockBoard
      mode="view"
      mySchedule={mySchedule || []}
      className="pl-3 pr-6"
      topDateGroupClassName={cn(
        'sticky bg-gray-00 z-10 top-[64px] md:top-[136px]',
        {
          'top-[120px] md:top-[192px]': isBarBannerShown,
        },
      )}
    />
  );
}

function BottomButtonForMobile() {
  const { isFooterShown } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const t = useTranslations('userDashboard');

  function handleFloatingBottomButtonClick() {
    progressRouter.push('/events/new');
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-10 w-full bg-gray-00 p-4 shadow-[0px_-4px_32px_0px_rgba(0,0,0,0.05)] transition-opacity duration-300 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <div className="mx-auto w-full max-w-screen-md">
        <Button
          variant="dark"
          onClick={handleFloatingBottomButtonClick}
          fullWidth
        >
          <span className="flex items-center justify-center gap-1">
            <span>{t('createEvent')}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}
