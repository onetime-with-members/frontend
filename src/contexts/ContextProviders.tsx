'use client';

import { PageModeContextProvider } from './PageModeContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return <PageModeContextProvider>{children}</PageModeContextProvider>;
}
