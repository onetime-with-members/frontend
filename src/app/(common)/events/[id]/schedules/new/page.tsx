import { eventQueryOptions } from '@/features/event/api/events.option';
import ScheduleFormContextProvider from '@/features/schedule/contexts/ScheduleFormContext';
import ScheduleAddPage from '@/features/schedule/pages/ScheduleAddPage';
import auth from '@/lib/auth/auth.server';
import { QueryClient } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;

  const queryClient = new QueryClient();

  const event = await queryClient.fetchQuery({
    ...eventQueryOptions(eventId),
  });

  if (!event) notFound();

  const { isLoggedIn } = await auth();

  return (
    <ScheduleFormContextProvider isLoggedIn={isLoggedIn}>
      <ScheduleAddPage isLoggedIn={isLoggedIn} />
    </ScheduleFormContextProvider>
  );
}
