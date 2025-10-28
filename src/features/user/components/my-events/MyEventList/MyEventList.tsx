import MyEvent from '@/components/event/my-event';
import GrayBackground from '@/components/gray-background';
import { useMyEventsQuery } from '@/features/user/api/user.query';

export default function MyEventList() {
  const { data: myEvents } = useMyEventsQuery();

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      {myEvents?.map((event) => (
        <MyEvent
          key={event.event_id}
          event={event}
          className="border-0 md:border"
        />
      ))}
      <GrayBackground device="mobile" breakpoint="md" />
    </div>
  );
}
