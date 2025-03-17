import { useTranslations } from 'next-intl';

import Alert from '@/components/alert/Alert/Alert';
import { useRouter } from '@/navigation';

interface BackButtonAlertProps {
  backHref: string | -1;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BackButtonAlert({
  setIsOpen,
  backHref,
}: BackButtonAlertProps) {
  const router = useRouter();
  const t = useTranslations('alert');

  function handleBackButtonConfirm() {
    setIsOpen(false);
  }

  function handleBackButtonCancel() {
    if (backHref === -1) {
      router.back();
    } else {
      router.push(backHref);
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
      confirmText={t('backButtonConfirm')}
      cancelText={t('backButtonCancel')}
    >
      <div className="flex h-full flex-col items-center gap-1 pb-8 pt-10 text-center">
        <h2 className="text-gray-80 text-lg-300">{t('backButtonTitle')}</h2>
        <p className="text-gray-60 text-md-100">
          {t.rich('backButtonDescription', {
            br: () => <br />,
          })}
        </p>
      </div>
    </Alert>
  );
}
