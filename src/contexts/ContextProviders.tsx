import { FooterContextProvider } from './FooterContext';
import { MyScheduleContextProvider } from './MyScheduleContext';

interface ContextProvidersProps {
  children: React.ReactNode;
}

export default function ContextProviders({ children }: ContextProvidersProps) {
  return (
    <FooterContextProvider>
      <MyScheduleContextProvider>{children}</MyScheduleContextProvider>
    </FooterContextProvider>
  );
}
