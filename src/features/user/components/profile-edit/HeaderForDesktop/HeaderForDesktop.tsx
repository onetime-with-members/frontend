import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function HeaderForDesktop() {
  const t = useTranslations('profileEdit');
  const router = useRouter();

  return (
    <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
      <button className="text-gray-90" onClick={() => router.back()}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="title-lg-300">{t('editProfile')}</h1>
    </div>
  );
}
