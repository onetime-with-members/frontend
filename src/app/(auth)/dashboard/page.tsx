'use client';

import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

import {
  BottomButtonForMobile,
  Header,
  MyEventsContent,
  MyEventsHeader,
  MyScheduleContent,
  MyScheduleSkeleton,
} from './dashboard';
import BarBanner from '@/components/bar-banner';
import NavBar from '@/components/nav-bar';
import ToolbarTitleSkeleton from '@/components/skeleton/toolbar-title-skeleton';
import { userQueryOptions } from '@/lib/api/query-options';
import { ProgressLink } from '@/navigation';
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
