'use client';

import { useTranslations } from 'next-intl';

import Alert from '@/components/alert';
import { deleteEvent } from '@/lib/actions';
import { useRouter } from '@/navigation';
import { useParams, usePathname } from 'next/navigation';

export function LoginAlert({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const t = useTranslations('alert');

  return (
    <Alert
      onConfirm={() => router.push(`/login?redirect_url=${pathname}`)}
      onCancel={() => router.push(`/events/${params.id}/schedules/new`)}
      onClose={() => setIsOpen(false)}
      confirmText={t('loginConfirm')}
      cancelText={t('loginCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">{t('loginTitle')}</h2>
        <p className="text-gray-60 text-md-100">
          {t.rich('loginDescription', {
            br: () => <br />,
          })}
        </p>
      </div>
    </Alert>
  );
}

export function EventDeleteAlert({
  setIsEventDeleteAlertOpen,
}: {
  setIsEventDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ id: string }>();

  const t = useTranslations('alert');

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set('eventId', params.id);
    await deleteEvent(formData);

    setIsEventDeleteAlertOpen(false);
  }

  return (
    <Alert
      onConfirm={handleDelete}
      onCancel={() => setIsEventDeleteAlertOpen(false)}
      onClose={() => setIsEventDeleteAlertOpen(false)}
      confirmText={t('deleteEventConfirm')}
      cancelText={t('deleteEventCancel')}
      pendingText={t('deleteEventConfirming')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">{t('deleteEventTitle')}</h2>
        <p className="text-gray-60 text-md-100">
          {t.rich('deleteEventDescription', {
            br: () => <br />,
          })}
        </p>
      </div>
    </Alert>
  );
}
