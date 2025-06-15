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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  const event = await fetchEvent(id);
  const schedule = session
    ? await fetchScheduleDetail(event, !!session, '')
    : defaultScheduleDetail;
  const mySchedule = session ? await fetchMySchedule() : defaultMySchedule;
  const sleepTime = session ? await fetchSleepTime() : defaultSleepTime;
  const user = session ? await currentUser() : null;

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
