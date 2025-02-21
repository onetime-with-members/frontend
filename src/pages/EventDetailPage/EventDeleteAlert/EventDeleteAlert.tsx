import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Alert from '@/components/alert/Alert/Alert';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface EventDeleteAlertProps {
  setIsEventDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventDeleteAlert({
  setIsEventDeleteAlertOpen,
}: EventDeleteAlertProps) {
  const params = useParams<{ eventId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const deleteEvent = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/events/${params.eventId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/');
    },
  });

  function handleEventDeleteALertClose() {
    setIsEventDeleteAlertOpen(false);
  }

  function handleEventDelete() {
    deleteEvent.mutate();
  }

  return (
    <Alert
      onConfirm={handleEventDelete}
      onCancel={handleEventDeleteALertClose}
      onClose={handleEventDeleteALertClose}
      confirmText={
        deleteEvent.isPending
          ? t('alert.deleteEventConfirming')
          : t('alert.deleteEventConfirm')
      }
      cancelText={t('alert.deleteEventCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">
          {t('alert.deleteEventTitle')}
        </h2>
        <p className="text-gray-60 text-md-100">
          <Trans i18nKey="alert.deleteEventDescription">
            이벤트를 삭제하면, 해당 이벤트에 <br />
            등록된 모든 스케줄이 삭제돼요!
          </Trans>
        </p>
      </div>
    </Alert>
  );
}
