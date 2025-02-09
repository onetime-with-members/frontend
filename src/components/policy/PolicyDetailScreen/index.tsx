import Header from './Header';
import MarkdownContent from './MarkdownContent';
import TopAppBarForMobile from './TopAppBarForMobile';
import TopNavBarForDesktop from './TopNavBarForDesktop';
import { PolicyKeyType } from '@/types/user.type';

interface PolicyDetailScreenProps {
  page: PolicyKeyType;
  onClose: () => void;
}

export default function PolicyDetailScreen({
  page,
  onClose,
}: PolicyDetailScreenProps) {
  const pageTitle =
    page === 'service_policy_agreement'
      ? '서비스 이용약관'
      : '개인정보 수집 및 이용 동의';

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
