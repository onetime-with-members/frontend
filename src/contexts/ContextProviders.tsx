import { FooterContextProvider } from './FooterContext';
import { PageModeContextProvider } from './PageModeContext';
import { ScrollContextProvider } from './ScrollContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>{children}</ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
