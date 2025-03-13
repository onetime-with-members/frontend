import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Alert from '@/components/alert/Alert/Alert';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

interface EventDeleteAlertProps {
  setIsEventDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventDeleteAlert({
  setIsEventDeleteAlertOpen,
}: EventDeleteAlertProps) {
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

  function handleEventDeleteAlertClose() {
    setIsEventDeleteAlertOpen(false);
  }

  function handleEventDelete() {
    if (isMutating) return;
    setIsMutating(true);
    deleteEvent();
    queryClient.invalidateQueries({ queryKey: ['events'] });
  }

  return (
    <Alert
      onConfirm={handleEventDelete}
      onCancel={handleEventDeleteAlertClose}
      onClose={handleEventDeleteAlertClose}
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
