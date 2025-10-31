import { useTranslations } from 'next-intl';

import ToolbarTitleSkeleton from '@/components/skeleton/ToolbarTitleSkeleton';
import { useUserQuery } from '@/features/user/api/user.query';
import { ProgressLink } from '@/navigation';

export default function TopToolbarForDesktop() {
  const { data: user } = useUserQuery();

  const t = useTranslations('userDashboard');

  return (
    <header className="hidden h-[72px] md:block">
      <div className="fixed z-30 mx-auto flex h-[72px] w-full max-w-[calc(768px+2rem)] items-center justify-between gap-2 rounded-t-3xl bg-gray-80 px-6 text-gray-00">
        <h1 className="flex-1 title-lg-300">
          {user ? (
            t('hello', { name: user.nickname })
          ) : (
            <ToolbarTitleSkeleton />
          )}
        </h1>
        <ProgressLink
          href="/events/new"
          className="hidden rounded-xl bg-primary-50 px-4 py-2 text-gray-00 duration-150 text-md-200 hover:bg-primary-60 active:bg-primary-60 md:flex"
        >
          {t('createEvent')}
        </ProgressLink>
      </div>
    </header>
  );
}
