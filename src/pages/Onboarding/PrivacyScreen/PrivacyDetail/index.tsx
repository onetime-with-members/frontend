import { PageDetailType } from '..';

import TopAppBarForMobile from '../../TopAppBarForMobile';
import TopNavBarForDesktop from '../../TopNavBarForDesktop';
import Header from './Header';
import MarkdownContent from './MarkdownContent';

interface PrivacyDetailProps {
  pageDetail: PageDetailType;
  setPageDetail: React.Dispatch<React.SetStateAction<PageDetailType>>;
}

export default function PrivacyDetail({
  pageDetail,
  setPageDetail,
}: PrivacyDetailProps) {
  const pageTitle =
    pageDetail === 'service_policy_agreement'
      ? '서비스 이용약관'
      : '개인정보 수집 및 이용 동의';

  function handlePageDetailClose() {
    setPageDetail(null);
  }

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center bg-gray-05">
      <>
        <TopAppBarForMobile
          pageTitle={pageTitle}
          handleBackButtonClick={handlePageDetailClose}
        />
        <TopNavBarForDesktop />
      </>
      <div className="mx-auto flex h-[calc(100%-4rem)] w-full max-w-screen-md flex-1 flex-col md:pb-6">
        <Header
          handlePageDetailClose={handlePageDetailClose}
          title={pageTitle}
        />
        <MarkdownContent pageDetail={pageDetail} />
      </div>
    </div>
  );
}
