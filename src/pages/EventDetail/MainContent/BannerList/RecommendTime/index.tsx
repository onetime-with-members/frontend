import dayjs from 'dayjs';
import { useState } from 'react';

import RecommendTimePopUp from './RecommendTimePopUp';
import { EventType } from '@/types/event.type';
import { RecommendSchedule } from '@/types/schedule.type';
import cn from '@/utils/cn';
import { IconChevronRight } from '@tabler/icons-react';

interface RecommendTimeProps {
  eventCategory: EventType['category'];
  recommendSchedules: RecommendSchedule[];
}

export default function RecommendTime({
  eventCategory,
  recommendSchedules,
}: RecommendTimeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAllMembersAvailable =
    recommendSchedules[0]?.impossible_names.length === 0 &&
    recommendSchedules[0]?.possible_count > 1;

  function handleDialogOpen() {
    if (recommendSchedules.length === 0) return;
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
            {isAllMembersAvailable ? '모두가 되는 시간' : '가장 많이 되는 시간'}
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
            'mt-2 rounded-2xl bg-primary-00 p-4 text-primary-50 text-md-300 sm:text-lg-300',
            {
              'bg-gray-00 text-success-60': isAllMembersAvailable,
              'bg-gray-05 text-gray-40': recommendSchedules.length === 0,
            },
          )}
        >
          {recommendSchedules.length === 0 ? (
            <>아무도 스케줄을 등록하지 않았어요.</>
          ) : (
            <>
              <span>
                {eventCategory === 'DATE'
                  ? dayjs(
                      recommendSchedules[0]?.time_point,
                      'YYYY.MM.DD',
                    ).format('YYYY.MM.DD (dd)')
                  : `${recommendSchedules[0]?.time_point}요일`}
              </span>
              <span className="ml-2">
                {recommendSchedules[0]?.start_time} -{' '}
                {recommendSchedules[0]?.end_time}
              </span>
            </>
          )}
        </div>
      </div>
      {isDialogOpen && (
        <RecommendTimePopUp
          onClose={handleDialogClose}
          recommendSchedules={recommendSchedules}
          eventCategory={eventCategory}
        />
      )}
    </>
  );
}
