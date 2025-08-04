'use client';

import { useLocale, useTranslations } from 'next-intl';

import ParticipantsDivider from '../_ui/ParticipantsDivider';
import EmptyEventBanner from '../_ui/empty';
import { EventContentsSectionHeading } from '../_ui/heading/EventContentsSectionHeading';
import ClockIcon from '@/components/icon/ClockIcon';
import HumanIcon from '@/components/icon/HumanIcon';
import MemberBadge from '@/components/member-badge';
import {
  eventQueryOptions,
  filteredRecommendedTimesQueryOptions,
  recommendedTimesQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { defaultEvent, weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { RecommendScheduleType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function DesktopContents() {
  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
    <div className="hidden flex-col md:flex md:w-1/2">
      {schedules?.length === 0 ? <EmptyEventBanner /> : <RecommendedTimes />}
    </div>
  );
}

function RecommendedTimes() {
  const t = useTranslations('eventDetail');
  const params = useParams<{ id: string }>();

  const { data: recommendedTimesData } = useQuery({
    ...recommendedTimesQueryOptions(params.id),
  });
  const { data: filteredRecommendedTimesData } = useQuery({
    ...filteredRecommendedTimesQueryOptions(params.id),
  });
  const recommendedTimes =
    filteredRecommendedTimesData && filteredRecommendedTimesData.length > 0
      ? filteredRecommendedTimesData
      : recommendedTimesData;

  return (
    <div className="flex flex-col gap-1">
      <EventContentsSectionHeading icon={<ClockIcon className="mr-1" />} sticky>
        {t('mostAvailable')}
      </EventContentsSectionHeading>
      <div className="flex flex-col gap-6">
        {recommendedTimes?.map((recommendedTime, index) => (
          <RecommendedTime key={index} recommendedTime={recommendedTime} />
        ))}
      </div>
    </div>
  );
}

export function RecommendedTime({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const isOnlyOneFiltered =
    recommendedTime.possible_count === 1 &&
    recommendedTime.impossible_names.length === 0;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5">
      <header className="flex items-start justify-between">
        <RecommendTimeHeading recommendedTime={recommendedTime} />
        <PaticipantStatus
          participantCount={{
            possible: recommendedTime.possible_count,
            total:
              recommendedTime.possible_names.length +
              recommendedTime.impossible_names.length,
          }}
        />
      </header>

      {!isOnlyOneFiltered && (
        <>
          <ParticipantsDivider />
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
        </>
      )}
    </div>
  );
}

export function ParticipantsSection({
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
          className={cn('flex items-center gap-1 text-sm-200', {
            'text-primary-60': type === 'available',
            'text-gray-40': type === 'unavailable',
          })}
        >
          {type === 'available' ? t('available') : t('unavailable')}
        </h4>
        <div className="flex flex-wrap gap-1.5">
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

export function RecommendTimeHeading({
  recommendedTime,
}: {
  recommendedTime: RecommendScheduleType;
}) {
  const params = useParams<{ id: string }>();
  const locale = useLocale();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  return (
    <div className="flex flex-col text-gray-60">
      <h2 className="text-sm-200">
        {event && event.category === 'DATE'
          ? dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
              locale === 'ko' ? 'M월 D일 dddd' : 'ddd, MMMM Do',
            )
          : dayjs()
              .day(
                weekdaysShortKo.findIndex(
                  (weekday) => weekday === recommendedTime.time_point,
                ),
              )
              .format('dddd')}
      </h2>
      <h3 className="text-lg-300">
        {recommendedTime.start_time} - {recommendedTime.end_time}
      </h3>
    </div>
  );
}

export function PaticipantStatus({
  participantCount,
}: {
  participantCount: { possible: number; total: number };
}) {
  const isAllPossible = participantCount.possible === participantCount.total;

  return (
    <div className="flex items-center">
      <span
        className={cn('text-lg text-gray-20', {
          'text-success-60': isAllPossible,
        })}
      >
        <HumanIcon />
      </span>
      <span
        className={cn('text-gray-30 text-sm-200', {
          'text-success-60': isAllPossible,
        })}
      >
        {participantCount.possible}/{participantCount.total}
      </span>
    </div>
  );
}
