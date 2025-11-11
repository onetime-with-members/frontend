import Alert from '..';
import { useTranslations } from 'next-intl';

import { useProgressRouter } from '@/navigation';
import { useRouter } from 'next/navigation';

export default function BackButtonAlert({
  setIsOpen,
  backHref,
}: {
  backHref: string | -1;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const t = useTranslations('alert');

  return (
    <Alert
      onConfirm={() => setIsOpen(false)}
      onCancel={() => {
        if (backHref === -1) {
          router.back();
        } else {
          progressRouter.push(backHref);
        }
      }}
      onClose={() => setIsOpen(false)}
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
