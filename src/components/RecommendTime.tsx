import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';

import { EventType } from '../types/event.type';
import { RecommendSchedule } from '../types/schedule.type';
import RecommendTimePopUp from './pop-up/RecommendTimePopUp';
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
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className={clsx(
          'min-w-[85%] cursor-pointer snap-start rounded-2xl px-4 py-5',
          {
            'bg-success-50': isAllMembersAvailable,
            'bg-gray-00': !isAllMembersAvailable,
          },
        )}
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span
            className={clsx('text-md-300', {
              'text-gray-00': isAllMembersAvailable,
              'text-gray-60': !isAllMembersAvailable,
            })}
          >
            {isAllMembersAvailable ? '모두가 되는 시간' : '가장 많이 되는 시간'}
          </span>

          <IconChevronRight
            size={24}
            className={clsx({
              'text-success-20': isAllMembersAvailable,
              'text-gray-30': !isAllMembersAvailable,
            })}
          />
        </div>
        <div
          className={clsx('text-md-300 sm:text-lg-300 mt-2 rounded-2xl p-4', {
            'bg-gray-00 text-success-60': isAllMembersAvailable,
            'bg-primary-00 text-primary-50': !isAllMembersAvailable,
          })}
        >
          <span>
            {eventCategory === 'DATE'
              ? dayjs(recommendSchedules[0]?.time_point, 'YYYY.MM.DD').format(
                  'YYYY.MM.DD (dd)',
                )
              : `${recommendSchedules[0]?.time_point}요일`}
          </span>
          <span className="ml-2">
            {recommendSchedules[0]?.start_time} -{' '}
            {recommendSchedules[0]?.end_time}
          </span>
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
