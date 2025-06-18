import ScheduleAddScreen from './content';
import { auth, currentUser } from '@/lib/auth';
import {
  defaultMySchedule,
  defaultScheduleDetail,
  defaultSleepTime,
} from '@/lib/constants';
import {
  fetchEvent,
  fetchMySchedule,
  fetchScheduleDetail,
  fetchSleepTime,
} from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const isLoggedIn = !!(await auth());

  const event = await fetchEvent(id);

  if (!event) {
    notFound();
  }

  const [schedule, mySchedule, sleepTime, userResponse] = await Promise.all([
    isLoggedIn
      ? fetchScheduleDetail(event, true, '')
      : Promise.resolve(defaultScheduleDetail),
    isLoggedIn ? fetchMySchedule() : Promise.resolve(defaultMySchedule),
    isLoggedIn ? fetchSleepTime() : Promise.resolve(defaultSleepTime),
    isLoggedIn ? currentUser() : Promise.resolve(null),
  ]);
  const user = userResponse?.user || null;

  return (
    <ScheduleAddScreen
      isLoggedIn={!!(await auth())}
      event={event}
      schedule={schedule}
      mySchedule={mySchedule}
      sleepTime={sleepTime}
      user={user}
    />
  );
}
