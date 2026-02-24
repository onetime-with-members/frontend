import SelectedDateTimeContextProvider from '@/features/event/contexts/SelectedDateTimeContext';
import EventConfirmPage from '@/features/event/pages/EventConfirmPage';

export default function Page() {
  return (
    <SelectedDateTimeContextProvider>
      <EventConfirmPage />
    </SelectedDateTimeContextProvider>
  );
}
