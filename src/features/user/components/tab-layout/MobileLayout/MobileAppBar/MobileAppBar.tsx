'use client';

import { useContext } from 'react';

import { PenIcon } from '@/components/icon';
import { MyPageTabContext } from '@/features/user/contexts/MyPageTabContext';
import { ProgressLink } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function MobileAppBar() {
  const { tabActive, pageTitle } = useContext(MyPageTabContext);

  const router = useRouter();

  return (
    <header className="h-[4rem]">
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
              <ProgressLink
                href="/mypage/schedule/edit"
                className="text-2xl text-gray-80"
              >
                <PenIcon />
              </ProgressLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
