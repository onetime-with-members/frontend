import Alert from '../alert/Alert';

interface CancelPopUpProps {
  onConfirm: () => void;
  onClose: () => void;
  confirmText: string;
  cancelText: string;
}

export default function ScheduleCancelPopUp({
  onConfirm,
  onClose,
  confirmText,
  cancelText,
}: CancelPopUpProps) {
  return (
    <Alert
      onConfirm={onConfirm}
      onClose={onClose}
      confirmText={confirmText}
      cancelText={cancelText}
    >
      <div className="flex-1 pb-8 pt-10">
        <p className="flex flex-col items-center justify-center">
          <span className="text-gray-60 text-lg-200">
            입력한 내용이 저장되지 않았어요
          </span>
          <strong className="mt-1 text-gray-80 title-sm-300">
            정말로 페이지에서 나가시겠어요?
          </strong>
        </p>
      </div>
    </Alert>
  );
}
