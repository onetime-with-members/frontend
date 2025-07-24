import { ToolbarButtons } from './button';
import { eventQueryOptions } from '@/lib/api/query-options';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function TopToolbar() {
  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  return (
    <div className="bg-gray-80 px-4 py-4 md:rounded-t-3xl md:px-6">
      <div className="flex items-center justify-between md:h-10">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
          {event?.title}
        </h1>
        <ToolbarButtons />
      </div>
    </div>
  );
}
