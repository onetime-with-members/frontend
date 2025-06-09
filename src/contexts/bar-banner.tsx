'use client';

import { setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { createContext, useState } from 'react';

import { defaultBarBanner } from '@/lib/constants';
import { BarBanner } from '@/lib/types';

export const BarBannerContext = createContext<{
  isBarBannerShown: boolean;
  barBanner: BarBanner | null;
  closeBarBanner: () => void;
}>({
  isBarBannerShown: false,
  barBanner: defaultBarBanner,
  closeBarBanner: () => {},
});

export default function BarBannerContextProvider({
  children,
  barBanner,
}: {
  children: React.ReactNode;
  barBanner: BarBanner | null;
}) {
  const [isBarBannerShown, setIsBarBannerShown] = useState(barBanner !== null);

  function closeBarBanner() {
    setCookie('bar-banner', 'false', {
      expires: dayjs().add(1, 'day').hour(0).minute(0).second(0).toDate(),
    });
    setIsBarBannerShown(false);
  }

  return (
    <BarBannerContext.Provider
      value={{ isBarBannerShown, barBanner, closeBarBanner }}
    >
      {children}
    </BarBannerContext.Provider>
  );
}
