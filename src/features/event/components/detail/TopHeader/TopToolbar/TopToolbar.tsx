import ToolbarButtons from './ToolbarButtons/ToolbarButtons';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function TopToolbar() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="bg-gray-05">
      <div className="flex items-center justify-between bg-gray-80 px-4 pb-4 pt-1 md:rounded-t-3xl md:px-6 md:py-4">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-lg-300">
          {event?.title}
        </h1>
        <ToolbarButtons />
      </div>
    </div>
  );
}
