import ScheduleAddScreen from './screen';
import { auth } from '@/lib/auth';

export default async function ScheduleAdd() {
  const session = await auth();

  return <ScheduleAddScreen isLoggedIn={!!session} />;
}
