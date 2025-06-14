import ScheduleAddScreen from './content';
import { auth } from '@/lib/auth';
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

  const event = await fetchEvent(id);
  const schedule = await fetchScheduleDetail(event, !!(await auth()), '');
  const mySchedule = await fetchMySchedule();
  const sleepTime = await fetchSleepTime();

  return (
    <ScheduleAddScreen
      isLoggedIn={!!(await auth())}
      event={event}
      schedule={schedule}
      mySchedule={mySchedule}
      sleepTime={sleepTime}
    />
  );
}
