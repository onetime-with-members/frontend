import { Suspense } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { BottomCTAButton, TopCTAButton } from './landing';
import ToolbarWrapper, {
  BottomButtonForMobile,
  MyTimeBlockBoardContent,
} from './user-dashboard';
import clockLottie from '@/assets/lotties/landing-clock.json';
import BarBanner from '@/components/bar-banner';
import ClockPattern from '@/components/clock-pattern';
import EmptyUI from '@/components/empty-ui';
import MyEvent from '@/components/event/my-event';
import EverytimeUI from '@/components/everytime-ui';
import PenIcon from '@/components/icon/pen';
import SleepIcon from '@/components/icon/sleep';
import Lottie from '@/components/lottie';
import NavBar from '@/components/nav-bar';
import TimeBlockBoardSkeleton from '@/components/skeleton/time-block-board-skeleton';
import ToolbarTitleSkeleton from '@/components/skeleton/toolbar-title-skeleton';
import { auth, currentUser } from '@/lib/auth';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  defaultMyEvent,
} from '@/lib/constants';
import { fetchMyEvents, fetchMySchedule, fetchSleepTime } from '@/lib/data';
import { Link } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Home() {
  if (await auth()) {
    return <UserDashboardPage />;
  }

  return <LandingPage />;
}

function LandingPage() {
  return (
    <>
      <header>
        <NavBar variant="transparent" heightZero />
      </header>
      <main className="w-full">
        <TopSection />
        <FeatureSection />
        <TypoSection />
        <CardSection />
        <BottomSection />
      </main>
    </>
  );
}

async function TopSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section>
      {/* Top Video */}
      <div className="relative flex h-[calc(350px+2.5rem)] flex-col items-center justify-end overflow-x-hidden">
        <div className="h-[350px] w-[350px]">
          <video autoPlay loop muted playsInline className="h-full w-full">
            <source
              src={`/videos/landing-phone-video-${locale === 'ko' ? 'ko' : 'en'}.mov`}
              type='video/mp4; codecs="hvc1"'
            />
            <source
              src={`/videos/landing-phone-video-${locale === 'ko' ? 'ko' : 'en'}.webm`}
              type="video/webm"
            />
          </video>
        </div>
        <div className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full bg-primary-10" />
      </div>

      {/* Title */}
      <div className="mt-11 flex flex-col items-center gap-3 px-4">
        <h1 className="text-center text-[1.75rem] font-bold leading-normal text-gray-80">
          {t('title.main')}
        </h1>
        <p className="text-center text-gray-40 text-md-200">
          {t.rich('description.main', {
            br: () => (
              <br
                className={cn('hidden', {
                  'min-[300px]:block': locale === 'ko',
                  'min-[400px]:block': locale === 'en',
                })}
              ></br>
            ),
          })}
        </p>
      </div>

      {/* CTA Button */}
      <div className="sticky bottom-4 z-30 mx-auto mt-9 flex w-full items-center justify-center px-4">
        <TopCTAButton />
      </div>
    </section>
  );
}

async function FeatureSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section className="flex flex-col gap-14 px-4 pt-[4.5rem]">
      {/* Recommend and Participants */}
      <Feature
        title={t.rich('title.feature1', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[350px]:block': locale === 'en',
                'min-[400px]:block md:hidden': locale === 'ko',
              })}
            />
          ),
        })}
        badgeLabel={t('badge.feature1')}
        description={t.rich('description.feature1', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[400px]:block': locale === 'en',
                'min-[300px]:block': locale === 'ko',
              })}
            />
          ),
        })}
        image={
          <div className="w-full max-w-[20rem]">
            <Image
              src={`/images/landing/recommend-and-participant-${locale}.png`}
              alt="참여자 및 시간 추천 UI 이미지"
              width={280}
              height={241}
              className="h-full w-full"
            />
          </div>
        }
      />

      {/* Time Block Board */}
      <Feature
        title={t.rich('title.feature2', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[470px]:block': locale === 'en',
                'min-[320px]:block md:hidden': locale === 'ko',
              })}
            />
          ),
        })}
        badgeLabel={t('badge.feature2')}
        description={t.rich('description.feature2', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[470px]:block': locale === 'en',
                'min-[320px]:block': locale === 'ko',
              })}
            />
          ),
        })}
        image={
          <div className="w-full max-w-[20rem]">
            <Image
              src={`/images/landing/time-block-board-${locale}.png`}
              alt="타임블록 되는 시간 및 안되는 시간 UI 이미지"
              width={320}
              height={279}
              className="h-full w-full"
            />
          </div>
        }
      />
    </section>
  );
}

async function Feature({
  title,
  badgeLabel,
  description,
  image,
}: {
  title: React.ReactNode;
  badgeLabel: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <div
      className={cn('mx-auto flex w-full flex-col items-center md:max-w-max', {
        'max-w-[30rem]': locale === 'en',
        'max-w-[20rem]': locale === 'ko',
      })}
    >
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-7">
          <div className="rounded-xl bg-primary-00 px-5 py-2 text-primary-40 text-md-300">
            {badgeLabel}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-[1.625rem] font-bold leading-[1.4] text-gray-80">
              {title}
            </h2>
            <p className="text-center text-gray-40 text-lg-200">
              {description}
            </p>
          </div>
        </div>
        {image}
      </div>
    </div>
  );
}

async function CardSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section className="mx-auto flex max-w-[50rem] flex-col gap-10 px-4 md:flex-row">
      {/* Fixed Schedule */}
      <Card
        title={t.rich('title.card1', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[400px]:block': locale === 'en',
                'min-[300px]:block': locale === 'ko',
              })}
            />
          ),
        })}
        badgeTitle={t('badge.card1')}
        description={t.rich('description.card1', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[400px]:block': locale === 'en',
                'min-[300px]:block': locale === 'ko',
              })}
            />
          ),
        })}
        image={
          <div className="mx-auto w-full max-w-[20rem]">
            <Image
              src={`/images/landing/fixed-schedule-${locale}.png`}
              alt="내 스케줄 UI 이미지"
              width={316}
              height={296}
              className="h-full w-full"
            />
          </div>
        }
      />

      {/* QR Code */}
      <Card
        title={t.rich('title.card2', {
          br: () => <br className="hidden min-[350px]:block" />,
        })}
        badgeTitle={t('badge.card2')}
        description={t.rich('description.card2', {
          br: () => <br className="hidden min-[350px]:block" />,
        })}
        image={
          <div className="h-[260px]">
            <div className="absolute bottom-0 left-0 pr-4">
              <Image
                src="/images/landing/paper-airplane.svg"
                alt="날아가는 종이 비행기 이미지"
                width={273}
                height={284}
              />
            </div>
          </div>
        }
        style={{
          background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
        }}
        backgroundPattern={<ClockPattern className="opacity-50" />}
      />
    </section>
  );
}

function Card({
  title,
  badgeTitle,
  description,
  image,
  style,
  backgroundPattern,
}: {
  title: React.ReactNode;
  badgeTitle: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
  style?: React.CSSProperties;
  backgroundPattern?: React.ReactNode;
}) {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[25rem] flex-col items-start overflow-hidden rounded-2xl bg-primary-40 px-6 pt-10 text-gray-00 md:mx-0 md:max-w-full"
      style={style}
    >
      <div className="z-10 flex w-full flex-col gap-10">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-full bg-gray-00 px-5 py-2 text-primary-50 text-md-300">
            {badgeTitle}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.625rem] font-bold leading-[1.4]">{title}</h2>
            <p className="text-primary-10 text-lg-200">{description}</p>
          </div>
        </div>

        {image}
      </div>

      {backgroundPattern}
    </div>
  );
}

async function TypoSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section className="flex flex-col items-center gap-3 px-4 py-[7.5rem]">
      <div>
        <Image
          src="/images/landing/typo-clock.svg"
          alt="시계 아이콘"
          width={33}
          height={30}
        />
      </div>
      <p className="text-center text-[1.625rem] font-bold text-primary-50">
        {t.rich('title.highlight', {
          br: () => (
            <br
              className={cn('hidden', {
                'min-[450px]:block': locale === 'en',
                'min-[220px]:block': locale === 'ko',
              })}
            />
          ),
        })}
      </p>
    </section>
  );
}

async function BottomSection() {
  const t = await getTranslations('landing');
  const locale = await getLocale();

  return (
    <section className="relative mt-10 w-full overflow-hidden bg-primary-40 px-4 pb-14 pt-20">
      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-8">
          <div className="h-[152px] w-[152px]">
            <Lottie animationData={clockLottie} />
          </div>
          <p className="text-center text-gray-00 title-md-300">
            {t.rich('title.last', {
              br: () => (
                <br
                  className={cn('hidden', {
                    'min-[440px]:block': locale === 'en',
                    'min-[320px]:block': locale === 'ko',
                  })}
                />
              ),
            })}
          </p>
        </div>
        <BottomCTAButton />
      </div>
      <ClockPattern gap={14} />
    </section>
  );
}

async function UserDashboardPage() {
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

async function MyEventSection() {
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

async function MyEventsHeader() {
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
              'hidden md:flex': index === 1,
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

async function MyScheduleSection() {
  const mySchedule = await fetchMySchedule();
  const sleepTime = await fetchSleepTime();

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
        <MyTimeBlockBoardContent mySchedule={mySchedule} />
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

async function Header({
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
  const t = await getTranslations('userDashboard');

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-gray-90 title-sm-300">
            {!isPending ? children : <Skeleton width={200} height={30} />}
          </h2>
          {hasMore && (
            <Link href={moreHref} className="flex items-center text-gray-50">
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
            </Link>
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
