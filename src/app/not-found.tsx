import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('404');

  return {
    title: `${t('notFound')} | OneTime`,
  };
}

export default async function NotFound() {
  return <NotFoundPage />;
}
