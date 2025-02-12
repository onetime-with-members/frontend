import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Alert from '@/components/alert/Alert/Alert';
import { getFixedSchedules, resetIsEdited } from '@/store/fixed-schedules';
import { AppDispatch } from '@/store/store';

interface BackButtonAlertProps {
  backHref: string | -1;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackButtonAlert({
  setIsOpen,
  backHref,
}: BackButtonAlertProps) {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  function handleBackButtonConfirm() {
    setIsOpen(false);
  }

  async function handleBackButtonCancel() {
    if (backHref === -1) {
      dispatch(resetIsEdited());
      await dispatch(getFixedSchedules());
      navigate(-1);
    } else {
      navigate(backHref);
    }
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
