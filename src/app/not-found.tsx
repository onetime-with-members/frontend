import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getOriginalUrl(shortUrl: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/urls/action-original`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shorten_url: shortUrl,
      }),
    },
  );

  return await res.json();
}

async function getEvent(eventId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API_URL}/events/${eventId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return await res.json();
}

export async function generateMetadata() {
  const protocol = (await headers()).get('x-forwarded-proto');
  const host = (await headers()).get('x-forwarded-host');
  const pathname = (await headers()).get('x-pathname');

  const t = await getTranslations('404');

  const originalUrlRes = await getOriginalUrl(
    `${protocol}://${host}${pathname}`,
  );

  if (originalUrlRes.code === '404' || originalUrlRes.code === '400') {
    return {
      title: `${t('notFound')} | OneTime`,
    };
  }

  const {
    payload: { original_url: originalUrl },
  } = originalUrlRes;

  const eventId = originalUrl.split('/').at(-1);

  const eventRes = await getEvent(eventId);

  if (!eventRes.is_success) {
    return {
      title: `${t('notFound')} | OneTime`,
    };
  }

  const { payload: event } = eventRes;

  return {
    title: `${event?.title || ''} | OneTime`,
    openGraph: {
      title: `${event?.title || ''} | OneTime`,
      description:
        '링크로 접속해 자신의 스케줄을 등록하고 모두가 맞는 시간을 찾으세요.',
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default async function NotFound() {
  const protocol = (await headers()).get('x-forwarded-proto');
  const host = (await headers()).get('x-forwarded-host');
  const pathname = (await headers()).get('x-pathname');

  const originalUrlRes = await getOriginalUrl(
    `${protocol}://${host}${pathname}`,
  );

  if (originalUrlRes.code === '404' || originalUrlRes.code === '400') {
    return <NotFoundPage />;
  }

  const {
    payload: { original_url: originalUrl },
  } = originalUrlRes;

  const eventId = originalUrl.split('/').at(-1);

  redirect(`/events/${eventId}`);
}
