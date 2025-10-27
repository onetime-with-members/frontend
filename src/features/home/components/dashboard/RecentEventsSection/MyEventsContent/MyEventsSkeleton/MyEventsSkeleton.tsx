import MyEvent from '@/components/event/my-event';
import { MyEventType } from '@/features/user/models';
import cn from '@/lib/cn';

export default function MyEventsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <MyEvent
          key={index}
          event={new MyEventType()}
          className={cn('border-none', { 'hidden md:block': index === 1 })}
          isPending={true}
        />
      ))}
    </div>
  );
}
