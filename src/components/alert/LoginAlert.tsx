import Alert from './Alert';

interface LoginAlertProps {
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LoginAlert({
  onClose,
  onConfirm,
  onCancel,
}: LoginAlertProps) {
  return (
    <Alert
      onConfirm={onConfirm}
      onCancel={onCancel}
      onClose={onClose}
      confirmText="로그인"
      cancelText="다음에 할게요"
    >
      <div className="flex h-full w-[23rem] flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 title-sm-300">로그인 하시겠어요?</h2>
        <p className="text-gray-60 text-lg-200">
          로그인하면 정보가 자동으로 입력되고,
          <br />
          스케줄을 저장할 수 있어요!
        </p>
      </div>
    </Alert>
  );
}
