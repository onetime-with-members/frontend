import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import RecommendTimePopUp from './RecommendTimePopUp/RecommendTimePopUp';
import {
  useEventQuery,
  useRecommendedTimesQuery,
} from '@/queries/event.queries';
import cn from '@/utils/cn';
import { weekdaysShortKo } from '@/utils/weekday';
import { IconChevronRight } from '@tabler/icons-react';

export default function RecommendTime() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

  const { data: event } = useEventQuery(params.eventId);
  const { data: recommendTimes } = useRecommendedTimesQuery(params.eventId);

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
    <>
      <div
        className={cn(
          'min-w-[85%] cursor-pointer snap-start rounded-2xl bg-gray-00 px-4 py-5',
          {
            'bg-success-50': isAllMembersAvailable,
          },
        )}
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span
            className={cn('text-gray-60 text-md-300', {
              'text-gray-00': isAllMembersAvailable,
            })}
          >
            {isAllMembersAvailable
              ? t('eventDetail.allAvailable')
              : t('eventDetail.mostAvailable')}
          </span>
          <IconChevronRight
            size={24}
            className={cn('text-gray-30', {
              'text-success-20': isAllMembersAvailable,
            })}
          />
        </div>
        <div
          className={cn(
            'mt-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl bg-primary-00 p-4 text-primary-50 text-sm-300 xs:text-md-300 sm:text-lg-300',
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
                    ? dayjs(recommendTimes[0].time_point, 'YYYY.MM.DD').format(
                        'YYYY.MM.DD (ddd)',
                      )
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
                  {recommendTimes[0].start_time} - {recommendTimes[0].end_time}
                </span>
              </>
            ))}
        </div>
      </div>
      {isDialogOpen && <RecommendTimePopUp onClose={handleDialogClose} />}
    </>
  );
}
