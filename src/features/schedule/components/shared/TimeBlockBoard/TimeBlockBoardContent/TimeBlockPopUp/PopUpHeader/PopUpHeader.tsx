import { useContext } from 'react';

import { weekdaysShortKo } from '@/constants';
import { TimeBlockBoardContext } from '@/features/schedule/contexts/TimeBlockBoardContext';
import { TimeBlockPopUpContext } from '@/features/schedule/contexts/TimeBlockPopUpContext';
import dayjs from '@/lib/dayjs';
import { IconX } from '@tabler/icons-react';

export default function PopUpHeader() {
  const { event } = useContext(TimeBlockBoardContext);
  const {
    popUpData: { time, timePoint },
    handlePopUpClose,
  } = useContext(TimeBlockPopUpContext);

  const timeAdded30Minutes = dayjs(time, 'HH:mm')
    .add(30, 'minute')
    .format('HH:mm');

  const startTime = time;
  const endTime = timeAdded30Minutes === '00:00' ? '24:00' : timeAdded30Minutes;

  return (
    <div className="flex items-center justify-between bg-primary-50 px-5 pb-3 pt-4">
      <div className="text-gray-00 text-lg-300">
        <span>
          {event.category === 'DATE'
            ? dayjs(timePoint, 'YYYY.MM.DD').format('YYYY.MM.DD (ddd)')
            : dayjs()
                .day(
                  weekdaysShortKo.findIndex((weekday) => weekday === timePoint),
                )
                .format('dddd')}
        </span>
        <span className="ml-2">
          {startTime} - {endTime}
        </span>
      </div>
      <button className="text-primary-10" onClick={handlePopUpClose}>
        <IconX size={24} />
      </button>
    </div>
  );
}
