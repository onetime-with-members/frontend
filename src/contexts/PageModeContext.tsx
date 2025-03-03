import { createContext, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

export type PageMode = 'view' | 'create' | 'edit';

interface PageModeContextType {
  pageMode: PageMode;
}

export const PageModeContext = createContext<PageModeContextType>({
  pageMode: 'view',
});

export function PageModeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pageMode, setPageMode] = useState<PageMode>('view');

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/new')) {
      setPageMode('create');
    } else if (pathname.includes('/edit')) {
      setPageMode('edit');
    } else {
      setPageMode('view');
    }
  }, [pathname]);

  return (
    <PageModeContext.Provider value={{ pageMode }}>
      {children}
    </PageModeContext.Provider>
  );
}
