import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../api/axios';
import Alert from './Alert';
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
      confirmText={deleteEvent.isPending ? '삭제 중...' : '삭제'}
      cancelText="취소"
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 title-sm-300">
          정말로 이벤트를 삭제하시겠어요?
        </h2>
        <p className="text-gray-60 text-lg-200">
          이벤트를 삭제하면, 해당 이벤트에
          <br />
          등록된 모든 스케줄이 삭제돼요!
        </p>
      </div>
    </Alert>
  );
}
