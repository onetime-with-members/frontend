import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/new')) {
      setPageMode('create');
    } else if (location.pathname.includes('/edit')) {
      setPageMode('edit');
    } else {
      setPageMode('view');
    }
  }, [location]);

  return (
    <PageModeContext.Provider value={{ pageMode }}>
      {children}
    </PageModeContext.Provider>
  );
}
