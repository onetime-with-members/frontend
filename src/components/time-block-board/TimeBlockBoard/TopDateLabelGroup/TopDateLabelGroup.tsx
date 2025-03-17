import TopDateLabel from './TopDateLabel/TopDateLabel';
import { useEventQuery } from '@/queries/event.queries';
import { EventType } from '@/types/event.type';
import { useParams } from 'next/navigation';

interface TopDateLabelGroupProps {
  topLabelRef: React.RefObject<HTMLDivElement | null>;
  category: EventType['category'];
}

export default function TopDateLabelGroup({
  topLabelRef,
  category,
}: TopDateLabelGroupProps) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  return (
    <div className="pl-6">
      <div
        ref={topLabelRef}
        className="scrollbar-hidden flex flex-1 items-center gap-2 overflow-x-scroll"
      >
        {event?.ranges.map((timePoint) => (
          <TopDateLabel
            key={timePoint}
            category={category}
            timePoint={timePoint}
            className="min-w-[52px] flex-1 py-2 text-center"
          />
        ))}
      </div>
    </div>
  );
}
