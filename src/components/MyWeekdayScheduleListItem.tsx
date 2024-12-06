import { useState } from 'react';

import { MyWeekdaySchedule } from '../types/schedule.type';
import MyScheduleBottomSheet from './MyScheduleBottomSheet';
import { IconChevronRight } from '@tabler/icons-react';

interface MyWeekdayScheduleListItemProps {
  mySchedule: MyWeekdaySchedule;
}

export default function MyWeekdayScheduleListItem({
  mySchedule,
}: MyWeekdayScheduleListItemProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <li
        key={mySchedule.id}
        className="flex items-center justify-between rounded-xl bg-gray-05 p-4"
        onClick={() => setIsBottomSheetOpen(true)}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-gray-80 text-md-300">{mySchedule.title}</h3>
          <div>
            <span className="text-gray-40 text-sm-200">
              {mySchedule.start_time} - {mySchedule.end_time}
            </span>
          </div>
        </div>
        <div>
          <span className="text-gray-30">
            <IconChevronRight size={16} />
          </span>
        </div>
      </li>
      {isBottomSheetOpen && (
        <MyScheduleBottomSheet
          // onClose={handleBottomSheetClose}
          title={'hello world'}
          mode="view"
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }} // handleDeleteButtonClick={handleDeleteButtonClick}
          // handleEditButtonClick={handleEditButtonClick}
        />
      )}
    </>
  );
}
