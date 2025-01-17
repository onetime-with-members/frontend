import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../../../components/alert/Alert';

interface BackButtonAlertProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackButtonAlert({ setIsOpen }: BackButtonAlertProps) {
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  function handleBackButtonConfirm() {
    setIsOpen(false);
  }

  function handleBackButtonCancel() {
    navigate(`/events/${params.eventId}`);
  }

  function handleBackButtonClose() {
    setIsOpen(false);
  }

  return (
    <Alert
      onConfirm={handleBackButtonConfirm}
      onCancel={handleBackButtonCancel}
      onClose={handleBackButtonClose}
      confirmText="계속 입력하기"
      cancelText="나가기"
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">페이지를 나가시겠어요?</h2>
        <p className="text-gray-60 text-md-100">
          스케줄을 등록하지 않고 페이지를 벗어날 경우, <br />
          지금까지 입력한 내용이 사라져요!
        </p>
      </div>
    </Alert>
  );
}
