import axios from '../../../api/axios';
import { MyEvent } from '../../../types/event.type';
import MyEventItem from './MyEventItem';
import { useQuery } from '@tanstack/react-query';

export default function MyEventList() {
  const { isPending: isEventsPending, data: eventsData } = useQuery({
    queryKey: ['events', 'user', 'all'],
    queryFn: async () => {
      const res = await axios.get('/events/user/all');
      return res.data;
    },
  });

  const events: MyEvent[] = eventsData?.payload;

  if (isEventsPending || events === undefined) {
    return <></>;
  }

  return (
    <ul className="flex flex-col gap-5">
      {events.length === 0 ? (
        <div className="text-center text-gray-70">
          참여한 이벤트가 없습니다.
        </div>
      ) : (
        events.map((event) => <MyEventItem event={event} />)
      )}
    </ul>
  );
}
