'use client';

import { FooterContextProvider } from './FooterContext';
import { PageModeContextProvider } from './PageModeContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <PageModeContextProvider>
      <FooterContextProvider>{children}</FooterContextProvider>
    </PageModeContextProvider>
  );
}
