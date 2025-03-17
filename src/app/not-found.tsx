import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ShortURLRedirect from './components/ShortURLRedirect/ShortURLRedirect';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const t = await getTranslations('404');

  return {
    title: `${t('notFound')} | OneTime`,
  };
}

export default async function NotFound() {
  const host = (await headers()).get('x-forwarded-host');
  const pathname = (await headers()).get('x-pathname');

  if (
    host &&
    pathname &&
    host === '1-ti.me' &&
    pathname.startsWith('/') &&
    !pathname.slice(1).includes('/')
  ) {
    return <ShortURLRedirect />;
  }

  return <NotFoundPage />;
}
