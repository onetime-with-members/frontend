import { FooterContextProvider } from './FooterContext';
import { PageModeContextProvider } from './PageModeContext';
import PolicyContextProvider from './PolicyContext';
import { ScrollContextProvider } from './ScrollContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
          <PolicyContextProvider>{children}</PolicyContextProvider>
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
