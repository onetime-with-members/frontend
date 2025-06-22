'use client';

import { useLocale, useTranslations } from 'next-intl';

import EmptyEventBanner from './empty';
import { HeadingForDesktop } from './heading';
import ClockIcon from '@/components/icon/clock';
import MemberBadge from '@/components/member-badge';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { EventType, RecommendScheduleType, ScheduleType } from '@/lib/types';
import { getParticipants } from '@/lib/utils';

export default function DesktopContents({
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
  const locale = useLocale();

  dayjs.locale(locale);

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
