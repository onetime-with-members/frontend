import {
  eventQueryOptions,
  recommendedTimesQueryOptions,
} from '@/features/event/api/event.option';
import EventConfirmPage from '@/features/event/pages/EventConfirmPage';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(eventQueryOptions(eventId));
  await queryClient.prefetchQuery(recommendedTimesQueryOptions(eventId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventConfirmPage />
    </HydrationBoundary>
  );
}
