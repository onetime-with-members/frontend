import dayjs from 'dayjs';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

import { BottomButtons, ToolbarButtons } from './button';
import EmptyEventBanner from './empty';
import { HeadingForDesktop, ToolbarHeading } from './heading';
import MobileContents from './mobile-contents';
import { TimeBlockBoardContent } from './time-block-board';
import BarBanner from '@/components/bar-banner';
import ClockIcon from '@/components/icon/clock';
import MemberBadge from '@/components/member-badge';
import NavBar from '@/components/nav-bar';
import { auth } from '@/lib/auth';
import cn from '@/lib/cn';
import { defaultScheduleDetail, weekdaysShortKo } from '@/lib/constants';
import {
  fetchEvent,
  fetchQrCode,
  fetchRecommendedTimes,
  fetchScheduleDetail,
  fetchSchedules,
  fetchShortenUrl,
} from '@/lib/data';
import { EventType, RecommendScheduleType, ScheduleType } from '@/lib/types';
import { getParticipants } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchEvent(id);

  if (!event) {
    const t404 = await getTranslations('404');

    return {
      title: `${t404('notFound')} | OneTime`,
    };
  }

  return {
    title: `${event.title || ''} | OneTime`,
    openGraph: {
      title: `${event.title || ''} | OneTime`,
      description:
        '링크로 접속해 자신의 스케줄을 등록하고 모두가 맞는 시간을 찾으세요.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await fetchEvent(id);

  if (!event) {
    notFound();
  }

  const recommendedTimes = await fetchRecommendedTimes(id);
  const qrCode = await fetchQrCode(id);
  const schedules = await fetchSchedules(event);
  const scheduleDetail = (await auth())
    ? await fetchScheduleDetail(event, !!(await auth()), '')
    : defaultScheduleDetail;

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const pathname = headersList.get('x-pathname') || '';

  const shortenUrl = await fetchShortenUrl(`${protocol}://${host}${pathname}`);

  return (
    <div className="flex min-h-[110vh] flex-col">
      {/* Navigation Bar */}
      <NavBar variant="default" className="hidden md:flex" />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />

      {/* Top Toolbar and Bar Banner */}
      <ToolbarHeading>
        <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150">
          {/* Top Toolbar */}
          <div className="bg-gray-80 px-6 py-4 md:rounded-t-3xl">
            <div className="flex items-center justify-between md:h-10">
              <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
                {event.title}
              </h1>
              <ToolbarButtons
                event={event}
                qrCode={qrCode}
                shortenUrl={shortenUrl}
              />
            </div>
          </div>
          {/* Bar Banner */}
          <BarBanner
            className="h-[56px]"
            innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
          />
        </div>
      </ToolbarHeading>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] flex-col gap-6 bg-gray-05 px-4 pb-16 pt-6 md:px-6">
        <div className="flex gap-6">
          {/* Time Block Board */}
          <TimeBlockBoardContent event={event} schedules={schedules} />
          {/* Right Contents for Desktop */}
          <DesktopContents
            event={event}
            schedules={schedules}
            recommendedTimes={recommendedTimes}
          />
        </div>
        {/* Bottom Contents for Mobile */}
        <MobileContents
          event={event}
          schedules={schedules}
          recommendedTimes={recommendedTimes}
        />
      </main>

      {/* Bottom Button for Desktop and Mobile */}
      <BottomButtons
        schedules={schedules}
        event={event}
        qrCode={qrCode}
        shortenUrl={shortenUrl}
        scheduleDetail={scheduleDetail}
        isLoggedIn={!!(await auth())}
      />
    </div>
  );
}

function DesktopContents({
  event,
  schedules,
  recommendedTimes,
}: {
  event: EventType;
  schedules: ScheduleType[];
  recommendedTimes: RecommendScheduleType[];
}) {
  return (
    <div className="hidden flex-col md:flex md:w-[45%]">
      {schedules?.length === 0 ? (
        <EmptyEventBanner event={event} />
      ) : (
        <>
          <Participants schedules={schedules} />
          <RecommendedTimes event={event} recommendedTimes={recommendedTimes} />
        </>
      )}
    </div>
  );
}

function Participants({ schedules }: { schedules: ScheduleType[] }) {
  const participants = getParticipants(schedules);

  const t = useTranslations('eventDetail');

  return (
    <div className="flex flex-col gap-1">
      <HeadingForDesktop>
        <span className="flex items-center gap-2">
          <span>
            {t('participant', {
              count: participants.length,
            })}
          </span>
          <span className="text-primary-50">{participants.length}</span>
        </span>
      </HeadingForDesktop>
      <div className="flex flex-wrap gap-2 pb-9">
        {participants.map((participant, index) => (
          <MemberBadge key={index} variant="white">
            {participant}
          </MemberBadge>
        ))}
      </div>
    </div>
  );
}

function RecommendedTimes({
  event,
  recommendedTimes,
}: {
  event: EventType | undefined;
  recommendedTimes: RecommendScheduleType[];
}) {
  const t = useTranslations('eventDetail');

  return (
    <div className="flex flex-col gap-1">
      <HeadingForDesktop>{t('mostAvailable')}</HeadingForDesktop>
      <div className="flex flex-col gap-6">
        {recommendedTimes.map((recommendedTime, index) => (
          <RecommendedTime
            key={index}
            event={event}
            recommendedTime={recommendedTime}
          />
        ))}
      </div>
    </div>
  );
}

function RecommendedTime({
  event,
  recommendedTime,
}: {
  event: EventType | undefined;
  recommendedTime: RecommendScheduleType;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5">
      <h3 className="flex items-center gap-1 text-primary-50 text-md-300">
        <span>
          <ClockIcon fill="#4c65e5" size={20} />
        </span>
        <span className="flex items-center gap-2">
          <span>
            {event && event.category === 'DATE'
              ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                  'YYYY.MM.DD (ddd)',
                )
              : dayjs()
                  .day(
                    weekdaysShortKo.findIndex(
                      (weekday) => weekday === recommendedTime.time_point,
                    ),
                  )
                  .format('dddd')}
          </span>
          <span>
            {recommendedTime.start_time} - {recommendedTime.end_time}
          </span>
        </span>
      </h3>
      <div className="flex flex-col gap-5">
        <ParticipantsSection
          type="available"
          participants={recommendedTime.possible_names}
        />
        <ParticipantsSection
          type="unavailable"
          participants={recommendedTime.impossible_names}
        />
      </div>
    </div>
  );
}

function ParticipantsSection({
  type,
  participants,
}: {
  type: 'available' | 'unavailable';
  participants: string[];
}) {
  const t = useTranslations('eventDetail');

  return (
    participants.length > 0 && (
      <div className="flex flex-col gap-2">
        <h4
          className={cn('flex items-center gap-1 text-md-300', {
            'text-primary-50': type === 'available',
            'text-gray-50': type === 'unavailable',
          })}
        >
          <span>
            {type === 'available' ? t('available') : t('unavailable')}
          </span>
          <span>{participants.length}</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {participants.map((name, index) => (
            <MemberBadge
              key={index}
              variant={type === 'available' ? 'primary' : 'gray'}
            >
              {name}
            </MemberBadge>
          ))}
        </div>
      </div>
    )
  );
}
