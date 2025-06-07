import { Suspense } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import BottomButtonForMobile from './components/user-dashboard/bottom-button';
import Header from './components/user-dashboard/header';
import ToolbarWrapper from '@/app/components/user-dashboard/toolbar-wrapper';
import BarBanner from '@/components/bar-banner';
import EmptyUI from '@/components/empty-ui';
import MyEvent from '@/components/event/my-event';
import EverytimeUI from '@/components/everytime-ui';
import PenIcon from '@/components/icon/pen';
import SleepIcon from '@/components/icon/sleep';
import NavBar from '@/components/nav-bar';
import TimeBlockBoardSkeleton from '@/components/skeleton/time-block-board-skeleton';
import ToolbarTitleSkeleton from '@/components/skeleton/toolbar-title-skeleton';
import MyTimeBlockBoard from '@/components/time-block-board/my-schedule';
import { currentUser } from '@/lib/auth';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  defaultMyEvent,
} from '@/lib/constants';
import { fetchMyEvents, fetchMySchedule, fetchSleepTime } from '@/lib/data';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

export default async function UserDashboardPage() {
  const user = await currentUser();

  const t = await getTranslations('userDashboard');

  return (
    <div className="flex flex-col">
      <NavBar variant="default" className="hidden md:flex" />
      <NavBar variant="black" className="flex md:hidden" />

      <main className="mx-auto w-full max-w-[calc(768px+2rem)]">
        {/* Top Toolbar */}
        <header className="hidden h-[72px] w-full justify-center md:flex">
          <ToolbarWrapper>
            <div className="flex h-[72px] items-center rounded-t-3xl bg-gray-80 px-6 text-gray-00">
              <div className="mx-auto flex w-full max-w-screen-md items-center justify-between gap-2">
                <h1 className="flex-1 title-lg-300">
                  {user ? (
                    t('hello', { name: user.nickname })
                  ) : (
                    <ToolbarTitleSkeleton />
                  )}
                </h1>
                <Link
                  href="/events/new"
                  className="hidden rounded-xl bg-primary-50 px-4 py-2 text-gray-00 duration-150 text-md-200 hover:bg-primary-60 active:bg-primary-60 md:flex"
                >
                  {t('createEvent')}
                </Link>
              </div>
            </div>
          </ToolbarWrapper>
        </header>

        {/* Bar Banner */}
        <BarBanner
          className="h-[56px]"
          innnerClassName="fixed max-w-[calc(768px+2rem)] w-full z-30"
        />

        {/* Main Content */}
        <div className="flex flex-col gap-14 bg-gray-05 px-4 pb-20 pt-6 md:px-6">
          {/* Recent Events */}
          <MyEventSection />
          {/* My Schedule */}
          <Suspense fallback={<MyScheduleSkeleton />}>
            <MyScheduleSection />
          </Suspense>
        </div>

        {/* Bottom Button For Mobile */}
        <BottomButtonForMobile />
      </main>
    </div>
  );
}

export async function MyEventSection() {
  return (
    <section className="flex flex-col gap-3">
      {/* Header */}
      <MyEventsHeader />
      {/* My Events */}
      <Suspense fallback={<MyEventsSkeleton />}>
        <MyEventsContent />
      </Suspense>
    </section>
  );
}

export async function MyEventsHeader() {
  const myEvents = await fetchMyEvents();

  const t = await getTranslations('userDashboard');

  return (
    <Header moreHref="/mypage/events">
      <span
        className={cn('block md:hidden', {
          'md:block': myEvents.length === 1,
        })}
      >
        {t('recentEvent')}
      </span>
      <span
        className={cn('hidden md:block', {
          'md:hidden': myEvents.length === 1,
        })}
      >
        {t('recentEvents')}
      </span>
    </Header>
  );
}

async function MyEventsContent() {
  const myEvents = await fetchMyEvents();

  const t = await getTranslations('userDashboard');

  return (
    <div
      className={cn('grid grid-cols-1 gap-4 md:grid-cols-2', {
        'md:grid-cols-1': myEvents.length <= 1,
      })}
    >
      {myEvents.length === 0 ? (
        <div className="rounded-2xl bg-gray-00 py-5">
          <EmptyUI>{t('noEvent')}</EmptyUI>
        </div>
      ) : (
        myEvents.slice(0, 2).map((myEvent, index) => (
          <MyEvent
            key={myEvent.event_id}
            event={myEvent}
            className={cn('border-none', {
              'hidden md:block': index === 1,
            })}
          />
        ))
      )}
    </div>
  );
}

function MyEventsSkeleton() {
  return Array.from({ length: 2 }).map((_, index) => (
    <MyEvent
      key={index}
      event={defaultMyEvent}
      className={cn('border-none', { 'hidden md:block': index === 1 })}
      isPending={true}
    />
  ));
}

export async function MyScheduleSection() {
  const mySchedule = await fetchMySchedule();
  const sleepTime = await fetchSleepTime();

  const cookieStore = await cookies();
  const isBarBannerShown = cookieStore.get('bar-banner');

  const t = await getTranslations('userDashboard');

  return (
    <section className="flex flex-col gap-3">
      <Header hasMore={false} description={t('myScheduleDescription')}>
        {t('mySchedule')}
      </Header>
      <div className="rounded-2xl bg-gray-00 pb-12">
        {/* Everytime UI */}
        <EverytimeUI className="rounded-t-2xl px-6" />

        {/* Sleep Time UI */}
        <div className="flex items-stretch justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-1.5">
            <span>
              <SleepIcon fill="#31333F" size={20} />
            </span>
            <span className="text-gray-80 text-lg-200">
              {sleepTime.sleep_start_time} - {sleepTime.sleep_end_time}
            </span>
          </div>
          <Link
            href="/mypage/schedules/edit"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-05 duration-150 hover:bg-gray-10 active:bg-gray-10"
          >
            <PenIcon fill="#474A5C" size={24} />
          </Link>
        </div>

        {/* Time Block Board */}
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
      </div>
    </section>
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
