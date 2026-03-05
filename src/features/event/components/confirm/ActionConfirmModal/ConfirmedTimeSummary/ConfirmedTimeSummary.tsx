import ConfirmedTimePickerButton from '../../shared/ConfirmedTimePickerButton';
import EventHeading from '../../shared/EventHeading';
import { useEventQuery } from '@/features/event/api/event.query';
import { useConfirmedTime } from '@/features/event/contexts/ConfirmedTimeContext';
import { useParams } from 'next/navigation';

export default function ConfirmedTimeSummary() {
  const confirmedTime = useConfirmedTime();

  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="flex flex-col gap-2 bg-gray-80 px-4 py-3 text-gray-00">
      <EventHeading variant="white" level={4} />
      <div className="grid grid-cols-2 gap-2">
        <ConfirmedTimePickerButton
          type="start"
          datePickerType={event.category === 'DATE' ? 'date' : 'day'}
          selectedDateTime={{
            date: confirmedTime.start.date,
            time: confirmedTime.start.time,
          }}
          variant="dark"
        />
        <ConfirmedTimePickerButton
          type="end"
          datePickerType={event.category === 'DATE' ? 'date' : 'day'}
          selectedDateTime={{
            date: confirmedTime.end.date,
            time: confirmedTime.end.time,
          }}
          variant="dark"
        />
      </div>
    </div>
  );
}
