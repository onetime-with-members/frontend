import { FooterContextProvider } from './FooterContext';
import { MyScheduleContextProvider } from './MyScheduleContext';
import { PageModeContextProvider } from './PageModeContext';
import { ScrollContextProvider } from './ScrollContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <MyScheduleContextProvider>
          <ScrollContextProvider>{children}</ScrollContextProvider>
        </MyScheduleContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
