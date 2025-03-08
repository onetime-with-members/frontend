import { useTranslations } from 'next-intl';

import { IconChevronLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TopHeaderForDesktop() {
  const router = useRouter();
  const t = useTranslations('profileEdit');

  function handleBackButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.back();
  }

  return (
    <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
      <Link
        href="/mypage/profile"
        className="text-gray-90"
        onClick={handleBackButtonClick}
      >
        <IconChevronLeft size={32} />
      </Link>
      <h1 className="title-lg-300">{t('editProfile')}</h1>
    </div>
  );
}
