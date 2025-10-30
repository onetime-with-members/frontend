'use client';

import { setCookie } from 'cookies-next';
import { createContext, useState } from 'react';

import { defaultBarBanner } from '@/features/banner/constants';
import { BarBanner } from '@/features/banner/types';
import dayjs from '@/lib/dayjs';

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
  const [isBarBannerShown, setIsBarBannerShown] = useState(!!barBanner);

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
