'use client';

import { useTranslations } from 'next-intl';

import { signOut } from '@/lib/auth';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { useRouter } from 'next/navigation';

export default function ProfileActions() {
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const t = useTranslations();

  function handleProfileEditButtonClick() {
    progressRouter.push('/mypage/profile/edit');
  }

  async function handleLogoutButtonClick() {
    await signOut();
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <GrayButton onClick={handleProfileEditButtonClick}>
        {t('profile.editProfile')}
      </GrayButton>
      <GrayButton onClick={handleLogoutButtonClick}>
        {t('profile.logout')}
      </GrayButton>
    </div>
  );
}

function GrayButton({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'w-full rounded-lg bg-gray-05 px-3 py-2 text-gray-60 duration-150 text-sm-200 hover:bg-gray-10 active:bg-gray-10',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
