import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Alert from '@/components/alert/alert';
import axios from '@/lib/axios';
import { useRouter } from '@/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const [isMutating, setIsMutating] = useState(false);

  const params = useParams<{ id: string }>();
  const t = useTranslations('alert');
  const queryClient = useQueryClient();

  const { mutate: deleteEvent } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/events/${params.id}`);
      return res.data;
    },
    onSuccess: async () => {
      location.href = '/';
      setIsEventDeleteAlertOpen(false);
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  function handleEventDelete() {
    if (isMutating) return;
    setIsMutating(true);
    deleteEvent();
    queryClient.invalidateQueries({ queryKey: ['events'] });
  }

  return (
    <Alert
      onConfirm={handleEventDelete}
      onCancel={() => setIsEventDeleteAlertOpen(false)}
      onClose={() => setIsEventDeleteAlertOpen(false)}
      confirmText={
        isMutating ? t('deleteEventConfirming') : t('deleteEventConfirm')
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
