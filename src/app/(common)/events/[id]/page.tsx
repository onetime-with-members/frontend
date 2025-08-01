import { Metadata } from 'next';

import { BottomButtons, ToolbarButtons } from './button';
import DesktopContents from './desktop-contents';
import { ToolbarHeading } from './heading';
import MobileContents from './mobile-contents';
import { TimeBlockBoardContent } from './time-block-board';
import BarBanner from '@/components/bar-banner';
import NavBar from '@/components/nav-bar';
import { fetchEvent } from '@/lib/api/data';
import {
  eventQueryOptions,
  qrCodeQueryOptions,
  recommendedTimesQueryOptions,
  schedulesQueryOptions,
  shortenUrlQueryOptions,
} from '@/lib/api/query-options';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchEvent(id);

  if (!event) {
    const t404 = await getTranslations('404');

    return {
      title: `${t404('notFound')} | OneTime`,
    };
  }

  return {
    title: `${event.title || ''} | OneTime`,
    openGraph: {
      title: `${event.title || ''} | OneTime`,
      description:
        '링크로 접속해 자신의 스케줄을 등록하고 모두가 맞는 시간을 찾으세요.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

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

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const pathname = headersList.get('x-pathname') || '';

  await Promise.all([
    queryClient.prefetchQuery({
      ...shortenUrlQueryOptions(`${protocol}://${host}${pathname}`),
    }),
    queryClient.prefetchQuery({ ...recommendedTimesQueryOptions(eventId) }),
    queryClient.prefetchQuery({
      ...qrCodeQueryOptions(eventId),
    }),
    queryClient.prefetchQuery({
      ...schedulesQueryOptions(event),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-[110vh] flex-col">
        {/* Navigation Bar */}
        <NavBar variant="default" className="hidden md:flex" />
        <NavBar variant="black" className="flex md:hidden" shadow={false} />

        {/* Top Toolbar and Bar Banner */}
        <ToolbarHeading>
          <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-00 duration-150">
            {/* Top Toolbar */}
            <div className="bg-gray-80 px-6 py-4 md:rounded-t-3xl">
              <div className="flex items-center justify-between md:h-10">
                <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
                  {event.title}
                </h1>
                <ToolbarButtons />
              </div>
            </div>
            {/* Bar Banner */}
            <BarBanner
              className="h-[56px]"
              innnerClassName="fixed max-w-[calc(768px+2rem)] w-full"
            />
          </div>
        </ToolbarHeading>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] flex-col gap-6 bg-gray-05 px-4 pb-16 pt-6 md:px-6">
          <div className="flex gap-6">
            {/* Time Block Board */}
            <TimeBlockBoardContent />
            {/* Right Contents for Desktop */}
            <DesktopContents />
          </div>
          {/* Bottom Contents for Mobile */}
          <MobileContents />
        </main>

        {/* Bottom Button for Desktop and Mobile */}
        <BottomButtons />
      </div>
    </HydrationBoundary>
  );
}
