import dayjs from 'dayjs';

import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function ConfirmedTimeMain() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const confirmedTime = event.confirmation;

  return (
    <div className="flex flex-col items-start rounded-xl bg-gray-60 px-3 py-2 text-gray-00">
      <div className="flex flex-row items-center gap-1">
        <CalendarIcon fontSize={16} innerfill="#5D6279" />
        <span className="text-sm-300">
          {dayjs(
            `${confirmedTime?.start_date} ${confirmedTime?.start_time}`,
            'YYYY.MM.DD hh:mm',
          ).fromNow()}
        </span>
      </div>
      <span className="font-normal text-lg-300">
        {dayjs(confirmedTime?.start_date, 'YYYY.MM.DD').format(
          'YYYY.MM.DD (dd)',
        )}{' '}
        {confirmedTime?.start_time} - {confirmedTime?.end_time}
      </span>
    </div>
  );
}
