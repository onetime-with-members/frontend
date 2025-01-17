import { useNavigate, useParams } from 'react-router-dom';

import Alert from '../../../components/alert/Alert';

interface LoginAlertProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginAlert({ setIsOpen }: LoginAlertProps) {
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  function handleLoginAlertClose() {
    setIsOpen(false);
  }

  function handleLoginAlertCancel() {
    navigate(`/events/${params.eventId}/schedules/new`);
  }

  function handleLoginAlertConfirm() {
    navigate(`/login?redirect_url=${location.pathname}`);
  }

  return (
    <Alert
      onConfirm={handleLoginAlertConfirm}
      onCancel={handleLoginAlertCancel}
      onClose={handleLoginAlertClose}
      confirmText="로그인"
      cancelText="다음에 할게요"
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">로그인 하시겠어요?</h2>
        <p className="text-gray-60 text-md-100">
          로그인하면 정보가 자동으로 입력되고,
          <br />
          스케줄을 저장할 수 있어요!
        </p>
      </div>
    </Alert>
  );
}
