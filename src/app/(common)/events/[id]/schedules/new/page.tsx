import ScheduleAddScreen from './schedule-new';
import { fetchEventServer } from '@/lib/api/data';
import { eventQueryOptions } from '@/lib/api/query-options';
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
    queryFn: async () => await fetchEventServer(eventId),
  });

  if (!event) notFound();

  return <ScheduleAddScreen />;
}
