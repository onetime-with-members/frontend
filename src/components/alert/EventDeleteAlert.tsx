import Alert from './Alert';

interface EventDeleteAlertProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  isDeleteLoading: boolean;
}

export default function EventDeleteAlert({
  onCancel,
  onClose,
  onConfirm,
  isDeleteLoading,
}: EventDeleteAlertProps) {
  return (
    <Alert
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      confirmText={isDeleteLoading ? '삭제 중...' : '삭제'}
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
