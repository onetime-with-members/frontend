import { eventQueryOptions } from '@/features/event/api/event.option';
import GuideModalContextProvider from '@/features/schedule/contexts/GuideModalContext';
import ScheduleFormContextProvider from '@/features/schedule/contexts/ScheduleFormContext';
import ScheduleNewPage from '@/features/schedule/pages/ScheduleNewPage';
import { auth } from '@/lib/auth';
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
      <GuideModalContextProvider>
        <ScheduleNewPage isLoggedIn={isLoggedIn} />
      </GuideModalContextProvider>
    </ScheduleFormContextProvider>
  );
}
