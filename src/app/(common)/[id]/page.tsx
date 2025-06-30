import NotFound from '@/app/not-found';
import { fetchEvent, fetchOriginalUrl } from '@/lib/api/data';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata() {
  const protocol = (await headers()).get('x-forwarded-proto');
  const host = (await headers()).get('x-forwarded-host');
  const pathname = (await headers()).get('x-pathname');

  const { originalUrl, error } = await fetchOriginalUrl(
    `${protocol}://${host}${pathname}`,
  );

  if (error) {
    notFound();
  }

  const eventId = originalUrl.split('/').at(-1);
  const event = await fetchEvent(eventId);

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

export default async function Page() {
  const protocol = (await headers()).get('x-forwarded-proto');
  const host = (await headers()).get('x-forwarded-host');
  const pathname = (await headers()).get('x-pathname');

  if (!protocol || !host || !pathname) {
    return NotFound();
  }

  const pathnameParts = pathname.slice(1).split('/') || [];
  const regex = /^[a-zA-Z0-9]+$/;
  if (pathnameParts.length !== 1 || !regex.test(pathnameParts[0])) {
    return NotFound();
  }

  const { originalUrl, error } = await fetchOriginalUrl(
    `${protocol}://${host}${pathname}`,
  );

  if (error) {
    return NotFound();
  }

  const eventId = originalUrl.split('/').at(-1);

  redirect(`/events/${eventId}`);
}
