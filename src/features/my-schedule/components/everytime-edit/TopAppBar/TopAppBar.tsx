import { useTranslations } from 'next-intl';

import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBar() {
  const progressRouter = useProgressRouter();
  const t = useTranslations('everytimeScheduleEdit');

  return (
    <nav className="h-[64px]">
      <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
        <div className="relative mx-auto flex w-full max-w-screen-sm">
          <div className="absolute left-0 flex h-full items-center">
            <button onClick={() => progressRouter.back()}>
              <IconChevronLeft size={24} />
            </button>
          </div>
          <div className="flex w-full items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
            {t('title')}
          </div>
        </div>
      </div>
    </nav>
  );
}
