import dayjs from 'dayjs';
import { useState } from 'react';

import { Event } from '../types/event.type';
import { RecommendSchedule } from '../types/schedule.type';
import RecommendTimePopUp from './dialog/RecommendTimePopUp';
import { IconChevronRight } from '@tabler/icons-react';

interface RecommendTimeProps {
  eventCategory: Event['category'];
  recommendSchedules: RecommendSchedule[];
}

export default function RecommendTime({
  eventCategory,
  recommendSchedules,
}: RecommendTimeProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className="min-w-[85%] cursor-pointer snap-start rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="text-md-300 text-gray-60">가장 많이 되는 시간</span>
          <IconChevronRight size={24} className="text-gray-30" />
        </div>
        <div className="text-md-300 sm:text-lg-300 mt-2 rounded-2xl bg-primary-00 p-4 text-primary-50">
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
