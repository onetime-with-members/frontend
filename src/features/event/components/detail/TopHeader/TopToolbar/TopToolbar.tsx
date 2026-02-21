import ConfirmedTime from '../../shared/ConfirmedTime';
import ConfirmEventBanner from './ConfirmEventBanner';
import ToolbarButtons from './ToolbarButtons/ToolbarButtons';
import { useEventQuery } from '@/features/event/api/event.query';
import useEventConfirmStatus from '@/features/event/hooks/useEventConfirmStatus';
import { useParams } from 'next/navigation';

export default function TopToolbar() {
  const params = useParams<{ id: string }>();

  const eventConfirmStatus = useEventConfirmStatus();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="flex flex-col gap-3 bg-gray-80 px-4 pb-4 pt-1 md:rounded-t-3xl md:px-6 md:py-3">
      <div className="flex h-10 items-center justify-between">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-md-300">
          {event?.title}
        </h1>
        <ToolbarButtons />
      </div>
      {eventConfirmStatus !== 'unavailable' && (
        <div className="md:hidden">
          {eventConfirmStatus === 'confirm' && <ConfirmedTime />}
          {eventConfirmStatus === 'available' && <ConfirmEventBanner />}
        </div>
      )}
    </div>
  );
}
