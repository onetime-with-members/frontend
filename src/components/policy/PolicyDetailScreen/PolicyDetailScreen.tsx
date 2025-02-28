import Header from './Header/Header';
import MarkdownContent from './MarkdownContent/MarkdownContent';
import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import useGrayBackground from '@/hooks/useGrayBackground';
import { PolicyKeyType } from '@/types/user.type';

interface PolicyDetailScreenProps {
  page: PolicyKeyType;
  pageTitle: string;
  onClose: () => void;
}

export default function PolicyDetailScreen({
  page,
  pageTitle,
  onClose,
}: PolicyDetailScreenProps) {
  useGrayBackground();

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center bg-gray-05">
      <>
        <TopAppBarForMobile
          pageTitle={pageTitle}
          handleBackButtonClick={onClose}
        />
        <TopNavBarForDesktop />
      </>
      <div className="mx-auto flex h-[calc(100%-4rem)] w-full max-w-screen-md flex-1 flex-col md:pb-6">
        <Header handlePageDetailClose={onClose} title={pageTitle} />
        <MarkdownContent page={page} />
      </div>
    </div>
  );
}
