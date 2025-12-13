import Header from './Header';
import MarkdownContent from './MarkdownContent';
import TopNavigation from './TopNavigation';
import GrayBackground from '@/components/GrayBackground';
import PolicyDetailContextProvider from '@/features/user/contexts/PolicyDetailContext';
import { PolicySchema } from '@/features/user/types';

export default function PolicyDetailScreen({
  page,
  pageTitle,
  onClose,
}: {
  page: keyof PolicySchema;
  pageTitle: string;
  onClose: () => void;
}) {
  return (
    <PolicyDetailContextProvider
      page={page}
      pageTitle={pageTitle}
      onClose={onClose}
    >
      <GrayBackground />
      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center bg-gray-00 md:bg-gray-05">
        <TopNavigation />
        <div className="mx-auto flex h-[calc(100%-4rem)] w-full max-w-screen-md flex-1 flex-col md:pb-6">
          <Header />
          <MarkdownContent />
        </div>
      </div>
    </PolicyDetailContextProvider>
  );
}
