import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import EmptyEventBanner from './empty';
import ClockIcon from '@/components/icon/clock';
import MemberBadge from '@/components/member-badge';
import MemberBadgeSkeleton from '@/components/skeleton/member-badge-skeleton';
import { BarBannerContext } from '@/contexts/bar-banner';
import { ParticipantContext } from '@/contexts/participant';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  defaultRecommendTime,
  weekdaysShortKo,
} from '@/lib/constants';
import { EventType, RecommendScheduleType, ScheduleType } from '@/lib/types';
import { useRecommendedTimesQuery } from '@/queries/event.queries';
import { useParams } from 'next/navigation';

export default function DesktopContents({
  event,
  schedules,
}: {
  event: EventType | undefined;
  schedules: ScheduleType[] | undefined;
}) {
  return (
    <div className="hidden flex-col md:flex md:w-[45%]">
      {schedules?.length === 0 ? (
        <EmptyEventBanner event={event} />
      ) : (
        <>
          <Participants />
          <RecommendedTimes event={event} />
        </>
      )}
    </div>
  );
}

function Participants() {
  const { participants, isLoading: isParticipantsLoading } =
    useContext(ParticipantContext);

  const t = useTranslations('eventDetail');

  return (
    <div className="flex flex-col gap-1">
      <Header>
        {!isParticipantsLoading ? (
          <span className="flex items-center gap-2">
            <span>
              {t('participant', {
                count: participants.length,
              })}
            </span>
            <span className="text-primary-50">{participants.length}</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Skeleton
              width={100}
              baseColor={SKELETON_GRAY}
              borderRadius={9999}
            />
            <Skeleton width={16} baseColor={SKELETON_GRAY} circle />
          </span>
        )}
      </Header>
      <div className="flex flex-wrap gap-2 pb-9">
        {!isParticipantsLoading
          ? participants.map((participant, index) => (
              <MemberBadge key={index} variant="white">
                {participant}
              </MemberBadge>
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <MemberBadgeSkeleton key={index} baseColor={SKELETON_GRAY} />
            ))}
      </div>
    </div>
  );
}

function RecommendedTimes({ event }: { event: EventType | undefined }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: recommendedTimes, isPending } = useRecommendedTimesQuery(
    params.id,
  );

  return (
    <div className="flex flex-col gap-1">
      <Header>
        {!isPending ? (
          t('mostAvailable')
        ) : (
          <Skeleton width={200} baseColor={SKELETON_GRAY} borderRadius={9999} />
        )}
      </Header>
      <div className="flex flex-col gap-6">
        {!isPending && recommendedTimes
          ? recommendedTimes.map((recommendedTime, index) => (
              <RecommendedTime
                key={index}
                event={event}
                recommendedTime={recommendedTime}
              />
            ))
          : Array.from({ length: 2 }, (_, index) => (
              <RecommendedTime
                key={index}
                event={event}
                recommendedTime={defaultRecommendTime}
                isPending={isPending}
              />
            ))}
      </div>
    </div>
  );
}

function Header({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { isBarBannerShown } = useContext(BarBannerContext);

  return (
    <h2
      className={cn(
        'sticky top-[123px] z-10 bg-gray-05 py-1 text-gray-90 text-lg-300 md:top-[136px]',
        {
          'top-[179px] md:top-[192px]': isBarBannerShown,
        },
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function RecommendedTime({
  event,
  recommendedTime,
  isPending,
}: {
  event: EventType | undefined;
  recommendedTime: RecommendScheduleType;
  isPending?: boolean;
}) {
  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5"
        style={{
          ...(isPending && { backgroundColor: SKELETON_GRAY }),
        }}
      >
        <h3 className="flex items-center gap-1 text-primary-50 text-md-300">
          <span>
            {!isPending ? (
              <ClockIcon fill="#4c65e5" size={20} />
            ) : (
              <Skeleton width={20} />
            )}
          </span>
          <span className="flex items-center gap-2">
            <span>
              {!isPending ? (
                event && event.category === 'DATE' ? (
                  dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                    'YYYY.MM.DD (ddd)',
                  )
                ) : (
                  dayjs()
                    .day(
                      weekdaysShortKo.findIndex(
                        (weekday) => weekday === recommendedTime.time_point,
                      ),
                    )
                    .format('dddd')
                )
              ) : (
                <Skeleton width={125} />
              )}
            </span>
            <span>
              {!isPending ? (
                `${recommendedTime.start_time} - ${recommendedTime.end_time}`
              ) : (
                <Skeleton width={100} />
              )}
            </span>
          </span>
        </h3>
        <div className="flex flex-col gap-5">
          <ParticipantsSection
            type="available"
            participants={recommendedTime.possible_names}
            isPending={isPending}
          />
          <ParticipantsSection
            type="unavailable"
            participants={recommendedTime.impossible_names}
            isPending={isPending}
          />
        </div>
      </div>
    </SkeletonTheme>
  );
}

function ParticipantsSection({
  type,
  participants,
  isPending,
}: {
  type: 'available' | 'unavailable';
  participants: string[];
  isPending?: boolean;
}) {
  const t = useTranslations('eventDetail');

  return (
    (isPending || participants.length > 0) && (
      <div className="flex flex-col gap-2">
        <h4
          className={cn('flex items-center gap-1 text-md-300', {
            'text-primary-50': type === 'available',
            'text-gray-50': type === 'unavailable',
          })}
        >
          <span>
            {!isPending ? (
              type === 'available' ? (
                t('available')
              ) : (
                t('unavailable')
              )
            ) : (
              <Skeleton width={80} />
            )}
          </span>
          <span>
            {!isPending ? (
              participants.length
            ) : (
              <Skeleton width={16} height={16} circle />
            )}
          </span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {!isPending
            ? participants.map((name, index) => (
                <MemberBadge
                  key={index}
                  variant={type === 'available' ? 'primary' : 'gray'}
                >
                  {name}
                </MemberBadge>
              ))
            : Array.from({ length: 4 }, (_, index) => (
                <MemberBadgeSkeleton
                  key={index}
                  baseColor={SKELETON_DARK_GRAY}
                />
              ))}
        </div>
      </div>
    )
  );
}
