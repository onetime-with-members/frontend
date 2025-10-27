'use client';

import { useLocale, useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import { MyEventType } from '@/features/user/models';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  weekdaysShortKo,
} from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { ProgressLink } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

export default function MyEvent({
  event,
  className,
  isPending = false,
}: {
  event: MyEventType;
  className?: string;
  isPending?: boolean;
}) {
  const t = useTranslations('common');
  const locale = useLocale();

  dayjs.locale(locale);

  const isRecommended =
    event.mostPossibleTimes.length > 0 && event.participantCount >= 1;

  const recommendedTime = event.mostPossibleTimes[0];

  return (
    <ProgressLink
      href={`/events/${event.eventId}`}
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5',
        className,
      )}
      style={{
        ...(isPending && { backgroundColor: SKELETON_GRAY }),
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-gray-30 text-sm-200">
          <span>
            {!isPending ? (
              dayjs(event.createdDate).fromNow()
            ) : (
              <Skeleton width={100} baseColor={SKELETON_DARK_GRAY} />
            )}
          </span>
          <span>·</span>
          <span>
            {!isPending ? (
              t('participantCount', {
                count: event.participantCount,
              })
            ) : (
              <Skeleton width={50} baseColor={SKELETON_DARK_GRAY} />
            )}
          </span>
        </div>
        <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-80 text-md-300 sm:text-lg-300">
          {!isPending ? (
            event.title
          ) : (
            <Skeleton width={200} baseColor={SKELETON_DARK_GRAY} />
          )}
        </h1>
      </div>
      {isPending ? (
        <Skeleton
          height={44}
          borderRadius="0.5rem"
          baseColor={SKELETON_DARK_GRAY}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-between rounded-lg bg-gray-05 px-4 py-3',
            {
              'bg-primary-00': isRecommended,
            },
          )}
        >
          <div
            className={cn(
              'flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-gray-40 text-sm-200 xs:text-md-200',
              {
                'text-primary-50': isRecommended,
              },
            )}
          >
            {isRecommended ? (
              recommendedTime && (
                <>
                  <span>
                    <Image
                      src="/images/alarm-icon.svg"
                      alt="알람 아이콘"
                      width={23}
                      height={20}
                    />
                  </span>
                  {event.category === 'DATE' ? (
                    <span>
                      {dayjs(recommendedTime.timePoint, 'YYYY.MM.DD').format(
                        'YYYY.MM.DD (ddd)',
                      )}
                    </span>
                  ) : (
                    <span>
                      {dayjs()
                        .day(
                          weekdaysShortKo.findIndex(
                            (weekday) => weekday === recommendedTime.timePoint,
                          ),
                        )
                        .format('dddd')}
                    </span>
                  )}
                  <span>
                    {recommendedTime.startTime} - {recommendedTime.endTime}
                  </span>
                </>
              )
            ) : (
              <span>{t('noOneSchedule')}</span>
            )}
          </div>
          <div>
            <IconChevronRight
              size={20}
              className={cn('text-gray-30', {
                'text-primary-20': isRecommended,
              })}
            />
          </div>
        </div>
      )}
    </ProgressLink>
  );
}
