import { useTranslations } from 'next-intl';

import Alert from '@/components/alert';
import { useDeleteEventMutation } from '@/features/event/api/event.query';
import useHomeUrl from '@/hooks/useHomeUrl';
import { useParams, useRouter } from 'next/navigation';

export default function EventDeleteAlert({
  setIsEventDeleteAlertOpen,
}: {
  setIsEventDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const homeUrl = useHomeUrl();

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('alert');

  const { mutateAsync: deleteEvent, isPending } = useDeleteEventMutation();

  async function handleAlertConfirm() {
    await deleteEvent(params.id);
    router.push(homeUrl);
  }

  return (
    <Alert
      onConfirm={handleAlertConfirm}
      onCancel={() => setIsEventDeleteAlertOpen(false)}
      onClose={() => setIsEventDeleteAlertOpen(false)}
      confirmText={
        isPending ? t('deleteEventConfirming') : t('deleteEventConfirm')
      }
      cancelText={t('deleteEventCancel')}
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
