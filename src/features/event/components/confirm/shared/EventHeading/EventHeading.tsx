import { CalendarIcon } from '@/components/icon';
import { useEventQuery } from '@/features/event/api/event.query';
import cn from '@/lib/cn';
import { useParams } from 'next/navigation';

export default function EventHeading({
  level,
  variant = 'default',
}: {
  level: 2 | 4;
  variant?: 'default' | 'white';
}) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const Heading = level == 2 ? 'h2' : 'h4';

  return (
    <Heading className="flex items-center gap-1">
      <CalendarIcon
        fontSize={level === 2 ? 20 : 18}
        innerfill={variant === 'white' ? '#31333F' : '#F6F7F8'}
      />
      <span
        className={cn('text-gray-70 text-lg-300', {
          'text-md-300': level === 4,
          'text-gray-00': variant === 'white',
        })}
      >
        {event.title}
      </span>
    </Heading>
  );
}
