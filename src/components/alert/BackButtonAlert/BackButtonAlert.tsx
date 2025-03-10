import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Alert from '@/components/alert/Alert/Alert';

interface BackButtonAlertProps {
  backHref: string | -1;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackButtonAlert({
  setIsOpen,
  backHref,
}: BackButtonAlertProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleBackButtonConfirm() {
    setIsOpen(false);
  }

  function handleBackButtonCancel() {
    if (backHref === -1) {
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
      confirmText={t('alert.backButtonConfirm')}
      cancelText={t('alert.backButtonCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">
          {t('alert.backButtonTitle')}
        </h2>
        <p className="text-gray-60 text-md-100">
          <Trans i18nKey="alert.backButtonDescription">
            스케줄을 등록하지 않고 페이지를 벗어날 경우, <br />
            지금까지 입력한 내용이 사라져요!
          </Trans>
        </p>
      </div>
    </Alert>
  );
}
