import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import RecommendTimePopUp from './RecommendTimePopUp/RecommendTimePopUp';
import cn from '@/lib/cn';
import { SKELETON_DARK_GRAY, SKELETON_GRAY } from '@/lib/constants';
import {
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/queries/event.queries';
import { weekdaysShortKo } from '@/utils/weekday';
import { IconChevronRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function RecommendTime({ isPending }: { isPending?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const t = useTranslations();

  const { data: event } = useEventQuery(params.id);
  const { data: recommendTimes } = useRecommendedTimesQuery(params.id);

  const isAllMembersAvailable =
    recommendTimes && recommendTimes.length > 0
      ? recommendTimes[0].impossible_names.length === 0 &&
        recommendTimes[0].possible_count > 1
      : false;

  function handleDialogOpen() {
    if (recommendTimes?.length === 0) return;
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className={cn(
          'flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5',
          {
            'bg-success-50': isAllMembersAvailable,
          },
        )}
        onClick={handleDialogOpen}
        style={{
          ...(isPending && {
            backgroundColor: SKELETON_GRAY,
          }),
        }}
      >
        <div className="ml-1 flex items-center justify-between">
          <span
            className={cn('text-gray-60 text-md-300', {
              'text-gray-00': isAllMembersAvailable,
            })}
          >
            {!isPending ? (
              isAllMembersAvailable ? (
                t('eventDetail.allAvailable')
              ) : (
                t('eventDetail.mostAvailable')
              )
            ) : (
              <Skeleton width={200} height={20} />
            )}
          </span>
          {!isPending ? (
            <IconChevronRight
              size={24}
              className={cn('text-gray-30', {
                'text-success-20': isAllMembersAvailable,
              })}
            />
          ) : (
            <Skeleton width={20} height={20} circle />
          )}
        </div>

        {!isPending ? (
          <div
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl bg-primary-00 p-4 text-primary-50 text-sm-300 xs:text-md-300 sm:text-lg-300',
              {
                'bg-gray-00 text-success-60': isAllMembersAvailable,
                'bg-gray-05 text-gray-40': recommendTimes?.length === 0,
              },
            )}
          >
            {recommendTimes &&
              event &&
              (recommendTimes.length === 0 ? (
                <>{t('common.noOneSchedule')}</>
              ) : (
                <>
                  <span>
                    {event.category === 'DATE'
                      ? dayjs(
                          recommendTimes[0].time_point,
                          'YYYY.MM.DD',
                        ).format('YYYY.MM.DD (ddd)')
                      : dayjs()
                          .day(
                            weekdaysShortKo.findIndex(
                              (weekday) =>
                                weekday === recommendTimes[0].time_point,
                            ),
                          )
                          .format('dddd')}
                  </span>
                  <span className="ml-2">
                    {recommendTimes[0].start_time} -{' '}
                    {recommendTimes[0].end_time}
                  </span>
                </>
              ))}
          </div>
        ) : (
          <Skeleton height={42} borderRadius={16} />
        )}
      </div>

      {isDialogOpen && <RecommendTimePopUp onClose={handleDialogClose} />}
    </SkeletonTheme>
  );
}
