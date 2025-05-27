import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import Skeleton from 'react-loading-skeleton';

import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  weekdaysShortKo,
} from '@/lib/constants';
import { MyEventType } from '@/lib/types';
import { Link } from '@/navigation';
import { IconChevronRight } from '@tabler/icons-react';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

dayjs.extend(relativeTime);

export default function MyEvent({
  event,
  className,
  innerClassName,
  isPending = false,
}: {
  event: MyEventType;
  className?: string;
  innerClassName?: string;
  isPending?: boolean;
}) {
  const t = useTranslations('common');

  const isRecommended =
    event.most_possible_times.length > 0 && event.participant_count >= 1;

  const recommendedTime = event.most_possible_times[0];

  return (
    <li className={className}>
      <Link
        href={`/events/${event.event_id}`}
        className={cn(
          'flex flex-col gap-3 rounded-2xl border border-gray-10 bg-gray-00 p-5',
          innerClassName,
        )}
        style={{
          ...(isPending && { backgroundColor: SKELETON_GRAY }),
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-30 text-sm-200">
            <span>
              {!isPending ? (
                dayjs(event.created_date).fromNow()
              ) : (
                <Skeleton width={100} baseColor={SKELETON_DARK_GRAY} />
              )}
            </span>
            <span>·</span>
            <span>
              {!isPending ? (
                t('participantCount', {
                  count: event.participant_count,
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
                        {dayjs(recommendedTime.time_point, 'YYYY.MM.DD').format(
                          'YYYY.MM.DD (ddd)',
                        )}
                      </span>
                    ) : (
                      <span>
                        {dayjs()
                          .day(
                            weekdaysShortKo.findIndex(
                              (weekday) =>
                                weekday === recommendedTime.time_point,
                            ),
                          )
                          .format('dddd')}
                      </span>
                    )}
                    <span>
                      {recommendedTime.start_time} - {recommendedTime.end_time}
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
      </Link>
    </li>
  );
}
