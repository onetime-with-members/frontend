import PageContent from '../components/confirm/PageContent';
import { ConfirmedTimeProvider } from '../contexts/ConfirmedTimeContext';
import GrayBackground from '@/components/GrayBackground';

export default function EventConfirmPage() {
  return (
    <ConfirmedTimeProvider>
      <div className="flex flex-col bg-gray-00 md:bg-gray-05">
        <GrayBackground device="desktop" breakpoint="md" />
        <PageContent />
      </div>
    </ConfirmedTimeProvider>
  );
}
