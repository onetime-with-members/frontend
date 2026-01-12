import { createContext } from 'react';

import { PolicySchema } from '../types';

export const PolicyDetailContext = createContext<{
  page: keyof PolicySchema;
  pageTitle: string;
  handleClose: () => void;
}>({ page: 'privacyPolicy', pageTitle: '', handleClose: () => {} });

export default function PolicyDetailContextProvider({
  children,
  page,
  pageTitle,
  onClose,
}: {
  children: React.ReactNode;
  page: keyof PolicySchema;
  pageTitle: string;
  onClose: () => void;
}) {
  return (
    <PolicyDetailContext.Provider
      value={{ page, pageTitle, handleClose: onClose }}
    >
      {children}
    </PolicyDetailContext.Provider>
  );
}
