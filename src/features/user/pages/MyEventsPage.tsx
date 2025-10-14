import { useMyEventsQuery } from '../api';
import EmptyMyEvent from '../components/my-events/EmptyMyEvents';
import MyEventList from '../components/my-events/MyEventList';

export default function MyEventsPage() {
  const { data: myEvents } = useMyEventsQuery();

  return myEvents?.length === 0 ? <EmptyMyEvent /> : <MyEventList />;
}
