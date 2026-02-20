import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { defaultConfirmedTime } from '@/features/event/constants';
import {
  getConfirmedTimeFromNow,
  getConfirmedTimeText,
} from '@/features/event/utils';
import { useParams } from 'next/navigation';

export default function ConfirmedTimeMain() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const confirmedTimeText = getConfirmedTimeText(
    event.confirmation ?? defaultConfirmedTime,
    event.category,
  );
  const confirmedTimeFromNow = getConfirmedTimeFromNow(
    event.confirmation ?? defaultConfirmedTime,
    event.category,
  );

  return (
    <div className="flex flex-col items-start rounded-xl bg-gray-60 px-3 py-2 text-gray-00">
      <div className="flex flex-row items-center gap-1">
        <CalendarIcon fontSize={16} innerfill="#5D6279" />
        <span className="text-sm-300">{confirmedTimeFromNow}</span>
      </div>
      <span className="font-normal text-lg-300">{confirmedTimeText}</span>
    </div>
  );
}
