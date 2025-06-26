'use client';

import { useTranslations } from 'next-intl';

import FormContent from './form-content';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import { defaultUser } from '@/lib/constants';
import { userQueryOption } from '@/lib/query-data';
import { IconChevronLeft } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ProfileEditPage() {
  const router = useRouter();

  const t = useTranslations('profileEdit');

  const { data: user } = useQuery({ ...userQueryOption });

  return (
    <>
      {/* Gray Background */}
      <GrayBackground device="desktop" breakpoint="sm" />

      {/* Navigation Bar for Desktop */}
      <NavBar user={user || defaultUser} className="hidden sm:flex" />

      {/* App Bar for Mobile */}
      <header className="block h-[67px] sm:hidden">
        <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button onClick={() => router.back()}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
              {t('editProfile')}
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Header for Desktop */}
        <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
          <button className="text-gray-90" onClick={() => router.back()}>
            <IconChevronLeft size={32} />
          </button>
          <h1 className="title-lg-300">{t('editProfile')}</h1>
        </div>

        {/* Form Content */}
        <FormContent user={user || defaultUser} />
      </main>
    </>
  );
}
