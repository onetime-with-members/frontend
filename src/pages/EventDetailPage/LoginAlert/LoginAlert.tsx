import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import Alert from '@/components/alert/Alert/Alert';

interface LoginAlertProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginAlert({ setIsOpen }: LoginAlertProps) {
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

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
      confirmText={t('alert.loginConfirm')}
      cancelText={t('alert.loginCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">{t('alert.loginTitle')}</h2>
        <p className="text-gray-60 text-md-100">
          <Trans i18nKey="alert.loginDescription">
            로그인하면 정보가 자동으로 입력되고, <br />
            스케줄을 저장할 수 있어요!
          </Trans>
        </p>
      </div>
    </Alert>
  );
}
