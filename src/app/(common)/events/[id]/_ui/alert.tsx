'use client';

import { useTranslations } from 'next-intl';

import Alert from '@/components/alert';
import { deleteEventAction } from '@/lib/api/actions';
import { useProgressRouter } from '@/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, usePathname, useRouter } from 'next/navigation';

export function LoginAlert({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const progressRouter = useProgressRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const t = useTranslations('alert');

  return (
    <Alert
      onConfirm={() => progressRouter.push(`/login?redirect_url=${pathname}`)}
      onCancel={() => progressRouter.push(`/events/${params.id}/schedules/new`)}
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
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const t = useTranslations('alert');

  const { mutateAsync: deleteEvent, isPending } = useMutation({
    mutationFn: deleteEventAction,
    onSuccess: async (_, eventId) => {
      queryClient.removeQueries({ queryKey: ['events', eventId] });
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      router.push('/');
    },
  });

  return (
    <Alert
      onConfirm={async () => await deleteEvent(params.id)}
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
