'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import NavBar from '@/components/NavBar/NavBar';
import Image from 'next/image';

export default function NetworkErrorScreen() {
  const [isOffline, setIsOffline] = useState(false);

  const t = useTranslations('NetworkErrorScreen');

  useEffect(() => {
    function handleOffline() {
      setIsOffline(true);
      document.body.style.overflow = 'hidden';
    }

    function handleOnline() {
      setIsOffline(false);
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    isOffline && (
      <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-gray-00 px-4">
        <NavBar variant="black" disabled />
        <main className="flex -translate-y-6 flex-col items-center">
          <div>
            <Image
              src="/images/network-error-clock.svg"
              alt="The clock included exclamation mark"
              width={168}
              height={158}
              priority
            />
          </div>
          <h1 className="mt-8 text-center text-gray-80 title-sm-300">
            {t('title')}
          </h1>
          <p className="text-center text-gray-40 text-md-200">
            {t('description')}
          </p>
        </main>
      </div>
    )
  );
}
