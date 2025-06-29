import ScheduleAddScreen from './content';
import auth from '@/lib/api/auth.server';
import {
  fetchEvent,
  fetchMySchedule,
  fetchScheduleDetail,
  fetchSleepTime,
} from '@/lib/api/data';
import {
  defaultMySchedule,
  defaultScheduleDetail,
  defaultSleepTime,
} from '@/lib/constants';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { isLoggedIn } = await auth();

  const event = await fetchEvent(id);

  if (!event) {
    notFound();
  }

  const [schedule, mySchedule, sleepTime] = await Promise.all([
    isLoggedIn
      ? fetchScheduleDetail(event, '')
      : Promise.resolve(defaultScheduleDetail),
    isLoggedIn ? fetchMySchedule() : Promise.resolve(defaultMySchedule),
    isLoggedIn ? fetchSleepTime() : Promise.resolve(defaultSleepTime),
  ]);

  return (
    <ScheduleAddScreen
      isLoggedIn={isLoggedIn}
      event={event}
      schedule={schedule}
      mySchedule={mySchedule}
      sleepTime={sleepTime}
    />
  );
}
