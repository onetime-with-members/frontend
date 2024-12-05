import { FooterContextProvider } from './FooterContext';
import { MyScheduleContextProvider } from './MyScheduleContext';
import { ScrollContextProvider } from './ScrollContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <FooterContextProvider>
      <MyScheduleContextProvider>
        <ScrollContextProvider>{children}</ScrollContextProvider>
      </MyScheduleContextProvider>
    </FooterContextProvider>
  );
}
