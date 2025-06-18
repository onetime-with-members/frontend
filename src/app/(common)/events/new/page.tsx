import EventFormScreen from '@/components/event/form-screen';
import { auth, currentUser } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('createEvent');

  return {
    title: `${t('createEvent')} | OneTime`,
  };
}

export default async function EventCreate() {
  const user = (await auth()) ? (await currentUser()).user : null;

  return <EventFormScreen type="create" user={user} />;
}
