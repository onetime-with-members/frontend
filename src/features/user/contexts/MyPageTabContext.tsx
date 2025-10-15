'use client';

import { useTranslations } from 'next-intl';
import { createContext, useEffect, useState } from 'react';

import { PageTitleType, TabActiveType } from '../models';
import { myPageTabActive, myPageTitle } from '../utils';
import { usePathname } from 'next/navigation';

export const MyPageTabContext = createContext<{
  tabActive: TabActiveType;
  pageTitle: PageTitleType;
}>({
  tabActive: null,
  pageTitle: null,
});

export default function MyPageTabContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const t = useTranslations('mypage');

  const [tabActive, setTabActive] = useState<TabActiveType>(
    myPageTabActive(pathname),
  );

  const pageTitle: PageTitleType = myPageTitle(tabActive, t);

  useEffect(() => {
    setTabActive(myPageTabActive(pathname));
  }, [pathname]);

  return (
    <MyPageTabContext.Provider value={{ tabActive, pageTitle }}>
      {children}
    </MyPageTabContext.Provider>
  );
}
