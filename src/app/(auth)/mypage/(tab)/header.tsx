'use client';

import { useTranslations } from 'next-intl';

import PenIcon from '@/components/icon/pen';
import { myPageTabActive, myPageTitle } from '@/lib/utils';
import { Link, useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

export function MobileHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('mypage');

  const tabActive = myPageTabActive(pathname);
  const pageTitle = myPageTitle(tabActive, t);

  return (
    <header>
      <nav className="h-[4rem]">
        <div className="fixed z-50 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          <div className="mx-auto grid w-full max-w-screen-md grid-cols-3">
            <div className="flex items-center justify-start">
              <button onClick={() => router.back()}>
                <IconChevronLeft size={24} />
              </button>
            </div>
            <h1 className="flex items-center justify-center whitespace-nowrap text-gray-90 text-lg-300">
              {pageTitle}
            </h1>
            <div className="flex items-center justify-end">
              {tabActive === 'schedules' && (
                <Link href="/mypage/schedules/edit">
                  <PenIcon fill="#31333F" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function DesktopHeader() {
  const pathname = usePathname();
  const t = useTranslations('mypage');

  const tabActive = myPageTabActive(pathname);
  const pageTitle = myPageTitle(tabActive, t);

  return (
    <header className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
      {tabActive === 'schedules' && (
        <Link href="/mypage/schedules/edit">
          <PenIcon fill="#31333F" />
        </Link>
      )}
    </header>
  );
}
