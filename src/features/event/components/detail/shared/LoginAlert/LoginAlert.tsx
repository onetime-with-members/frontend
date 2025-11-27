import { useTranslations } from 'next-intl';

import Alert from '@/components/alert';
import { usePathname } from '@/i18n/navigation';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function LoginAlert({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const progressRouter = useProgressRouter();
  const pathname = usePathname();
  const params = useParams<{ id: string }>();

  const t = useTranslations('alert');

  return (
    <Alert
      onConfirm={() => progressRouter.push(`/login?redirect_url=${pathname}`)}
      onCancel={() => progressRouter.push(`/events/${params.id}/schedules/new`)}
      onClose={() => setIsOpen(false)}
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
