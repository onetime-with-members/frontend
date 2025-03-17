import { useTranslations } from 'next-intl';

import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBarForMobile() {
  const router = useRouter();
  const t = useTranslations('profileEdit');

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <header className="block h-[67px] sm:hidden">
      <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
          <div className="flex items-center">
            <button onClick={handleBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
            {t('editProfile')}
          </h2>
        </div>
      </div>
    </header>
  );
}
