import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import { useParams } from 'next/navigation';

export default function PanelHeading() {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <h3 className="flex items-center gap-1">
      <CalendarIcon fontSize={20} innerfill="#F6F7F8" />
      <span className="text-gray-70 text-lg-300">{event.title}</span>
    </h3>
  );
}
