import { useTranslations } from 'next-intl';

import Alert from '@/components/alert/Alert/Alert';
import { useParams, useRouter } from 'next/navigation';

interface LoginAlertProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginAlert({ setIsOpen }: LoginAlertProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('alert');

  function handleLoginAlertClose() {
    setIsOpen(false);
  }

  function handleLoginAlertCancel() {
    router.push(`/events/${params.id}/schedules/new`);
  }

  function handleLoginAlertConfirm() {
    router.push(`/login?redirect_url=${location.pathname}`);
  }

  return (
    <Alert
      onConfirm={handleLoginAlertConfirm}
      onCancel={handleLoginAlertCancel}
      onClose={handleLoginAlertClose}
      confirmText={t('loginConfirm')}
      cancelText={t('loginCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">{t('loginTitle')}</h2>
        <p className="text-gray-60 text-md-100">
          {t.rich('loginDescription', {
            br: () => <br />,
          })}
        </p>
      </div>
    </Alert>
  );
}
