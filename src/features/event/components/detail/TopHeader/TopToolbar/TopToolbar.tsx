import ConfirmEventBanner from './ConfirmEventBanner';
import ToolbarButtons from './ToolbarButtons/ToolbarButtons';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function TopToolbar() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="flex flex-col gap-3 bg-gray-80 p-4 pt-1 md:rounded-t-3xl md:p-3 md:pl-5">
      <div className="flex items-center justify-between">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-md-300 md:text-lg-300">
          {event?.title}
        </h1>
        <ToolbarButtons />
      </div>
      {event.event_status !== 'CONFIRMED' && (
        <ConfirmEventBanner className="md:hidden" />
      )}
    </div>
  );
}
