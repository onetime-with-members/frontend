import { useContext } from 'react';

import Alert from '@/components/alert/Alert';
import { MyScheduleContext } from '@/contexts/MyScheduleContext';

interface MyScheduleDeleteAlertProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  isDeleteLoading: boolean;
}

export default function MyScheduleDeleteAlert({
  onConfirm,
  onCancel,
  onClose,
  isDeleteLoading,
}: MyScheduleDeleteAlertProps) {
  const { selectedTimeBlock } = useContext(MyScheduleContext);

  return (
    <Alert
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      confirmText={isDeleteLoading ? '삭제 중...' : '삭제'}
      cancelText="취소"
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">
          '{selectedTimeBlock?.title}' 삭제
        </h2>
        <p className="text-gray-60 text-md-100">
          정말로 해당 고정 스케줄을 삭제하시겠어요?
        </p>
      </div>
    </Alert>
  );
}
